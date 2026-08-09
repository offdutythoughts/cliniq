// Safe, quote-aware editing of src/data/db.ts.
//
// The DB is one 1,900-line file of dense single-line records, authored by hand
// over time, so it is inconsistent in ways that defeat naive find-and-replace:
//
//   • ids appear both single- and double-quoted:  {id:'LES-WK-MG'  vs  {id:"LES-WK-MG"
//   • fields inside ONE record mix quote styles:  tx1:"…"  next to  breed:'…'
//   • values contain escaped quotes:              note:'…Horner\'s…'
//   • records span one line or many
//
// Every codemod in this repo re-implemented "find the record, find the field,
// find its closing quote, splice" — and each one got a different subset of those
// four cases right. One of them silently appended content twice because it read
// the DB fresh on each run while iterating a plan built from the previous state.
//
// This module is the single place that logic lives. It operates on the file TEXT
// (not the parsed object) because the goal is a minimal, reviewable diff that
// preserves hand-authored formatting — a parse-and-reserialise pass would rewrite
// all 1,900 lines and make review impossible.
//
// Usage:
//   const db = loadDb()
//   db.appendToField('DIS-TOX-EG', 'tx1', ' (VETgirl 2023 p. 27)')
//   db.removeField('LES-PA-LUNGW', 'note')
//   db.save()      // writes once, at the end

import * as fs from 'fs'
import * as path from 'path'

const DB_PATH = path.join(__dirname, '../../src/data/db.ts')

export interface DbEditor {
  /** Text of the field, or null when the row or field is absent. */
  readField(id: string, field: string): string | null
  /** Append to an existing field. Returns false if the row/field is absent. */
  appendToField(id: string, field: string, text: string): boolean
  /** Set a field, creating it before `anchorField` when it does not exist. */
  setField(id: string, field: string, value: string, anchorField?: string): boolean
  /** Delete a field and its trailing comma. Returns false if absent. */
  removeField(id: string, field: string): boolean
  /** Rows touched so far — guards against double-applying a plan. */
  readonly touched: ReadonlySet<string>
  save(): void
}

/** Escape a value for the quote style it is going into. */
const esc = (s: string, quote: string) =>
  quote === "'" ? s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") : s.replace(/"/g, '\\"')

export function loadDb(file = DB_PATH): DbEditor {
  let src = fs.readFileSync(file, 'utf8')
  const touched = new Set<string>()

  /** Byte range of one record, whichever quote style its id uses. */
  function recordSpan(id: string): { start: number; end: number } | null {
    const start = ["'", '"']
      .map(q => src.indexOf(`{id:${q}${id}${q}`))
      .find(i => i >= 0)
    if (start === undefined) return null
    // A record runs until the next one begins at the array's 4-space indent.
    const nexts = [src.indexOf("\n    {id:'", start + 1), src.indexOf('\n    {id:"', start + 1)]
      .filter(i => i > 0)
    return { start, end: nexts.length ? Math.min(...nexts) : src.length }
  }

  /** Locate a field's value inside a record slice, honouring escaped quotes. */
  function fieldSpan(rec: string, field: string) {
    const m = new RegExp(`(?:^|[,\\n])\\s*${field}:(['"])`).exec(rec)
    if (!m) return null
    const quote = m[1]
    const valStart = m.index + m[0].length
    let i = valStart
    while (i < rec.length && !(rec[i] === quote && rec[i - 1] !== '\\')) i++
    if (i >= rec.length) return null // unterminated — refuse rather than corrupt
    return { keyStart: m.index, quote, valStart, valEnd: i }
  }

  const withRecord = <T,>(id: string, fn: (rec: string, span: { start: number; end: number }) => [T, string | null]): T | null => {
    const span = recordSpan(id)
    if (!span) return null
    const [result, next] = fn(src.slice(span.start, span.end), span)
    if (next !== null) {
      src = src.slice(0, span.start) + next + src.slice(span.end)
      touched.add(id)
    }
    return result
  }

  return {
    touched,
    readField(id, field) {
      return withRecord(id, rec => {
        const f = fieldSpan(rec, field)
        return [f ? rec.slice(f.valStart, f.valEnd) : null, null]
      })
    },
    appendToField(id, field, text) {
      return withRecord(id, rec => {
        const f = fieldSpan(rec, field)
        if (!f) return [false, null]
        return [true, rec.slice(0, f.valEnd) + esc(text, f.quote) + rec.slice(f.valEnd)]
      }) ?? false
    },
    setField(id, field, value, anchorField = 'name') {
      return withRecord(id, rec => {
        const f = fieldSpan(rec, field)
        if (f) return [true, rec.slice(0, f.valStart) + esc(value, f.quote) + rec.slice(f.valEnd)]
        const a = fieldSpan(rec, anchorField)
        if (!a) return [false, null]
        const insert = `${field}:'${esc(value, "'")}',`
        return [true, rec.slice(0, a.keyStart + 1) + insert + rec.slice(a.keyStart + 1)]
      }) ?? false
    },
    removeField(id, field) {
      return withRecord(id, rec => {
        const f = fieldSpan(rec, field)
        if (!f) return [false, null]
        let end = f.valEnd + 1
        if (rec[end] === ',') end++
        return [true, rec.slice(0, f.keyStart === 0 ? 0 : f.keyStart + 1) + rec.slice(end)]
      }) ?? false
    },
    save() {
      fs.writeFileSync(file, src)
    },
  }
}
