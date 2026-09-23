'use client'
// ── Mix & Match screen ────────────────────────────────────────────────────────
// Users enter signalment (species, breed, age, sex) + free-text clinical sign
// and diagnostic keywords. The engine scores all disease pages and returns a
// ranked differential list grouped by aetiology.

import { useState, useMemo, useRef, useCallback, useId } from 'react'
import { searchDiseases, topDifferentials, suggestSignTerms, type TermSuggestion, type SearchInputs, type SearchCategory, type AgeCategory, type SexFilter, type NeuterFilter, type Species } from '../../lib/search/diseaseSearch'
import { useNav } from '../nav/NavContext'
import { SpTag } from './tags'
import { Tappable } from './Tappable'
import { styleStringToObject as s } from './style'
import { MIXMATCH_CAT } from './catPalette'
import './MixMatchScreen.css'

// Colour is the group signal: a small swatch from the shared aetiology palette
// (catPalette), so Infectious is the same crimson here as on a flow page.

// One segmented control for every signalment choice. Tapping the selected
// option clears it, except where `required` (species always has a value).
function Segmented<T extends string>({ options, value, onChange, required, label }: {
  options: [T, string][]
  value: T | undefined
  onChange: (v: T | undefined) => void
  required?: boolean
  label: string
}) {
  return (
    <div className="mm-seg" role="group" aria-label={label}>
      {options.map(([id, text]) => {
        const on = value === id
        return (
          <button key={id} type="button" className="mm-seg-btn" aria-pressed={on}
            onClick={() => onChange(on && !required ? undefined : id)}>{text}</button>
        )
      })}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mm-field">
      <span className="mm-field-label">{label}</span>
      {children}
    </div>
  )
}

// ── Keyword tag input ─────────────────────────────────────────────────────────
//
// With `suggest`, the box becomes a combobox over the engine's own vocabulary.
// Free text still commits on Enter — the dropdown does not restrict what can be
// typed, it just stops the vocabulary being invisible. Each row carries the
// number of pages the term would match, which is what separates a discriminating
// sign from a vague one before the reader has spent a search on it.
function KeywordInput({
  tags,
  onAdd,
  onRemove,
  placeholder,
  suggest,
}: {
  tags: string[]
  onAdd: (t: string) => void
  onRemove: (t: string) => void
  placeholder: string
  /** Omitted for the diagnostics box, which has no curated vocabulary yet. */
  suggest?: (query: string, exclude: string[]) => TermSuggestion[]
}) {
  const [draft, setDraft] = useState('')
  const [active, setActive] = useState(-1)   // -1 = nothing highlighted
  const [dismissed, setDismissed] = useState(false) // Escape closes without clearing
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  const hits = useMemo(
    () => (suggest && !dismissed ? suggest(draft, tags) : []),
    [suggest, dismissed, draft, tags],
  )
  const open = hits.length > 0

  function reset() { setDraft(''); setActive(-1); setDismissed(false) }
  function add(term: string) { if (!tags.includes(term)) onAdd(term); reset() }
  function commit() {
    const v = draft.trim().toLowerCase()
    if (v && !tags.includes(v)) onAdd(v)
    reset()
  }

  function onKey(e: React.KeyboardEvent) {
    if (open && e.key === 'ArrowDown') { e.preventDefault(); setActive(i => Math.min(i + 1, hits.length - 1)); return }
    if (open && e.key === 'ArrowUp')   { e.preventDefault(); setActive(i => Math.max(i - 1, -1)); return }
    // Escape closes the dropdown only — it must not clear what was typed, and
    // it must not bubble out to whatever else on the page listens for Escape.
    if (open && e.key === 'Escape')    { e.preventDefault(); e.stopPropagation(); setDismissed(true); setActive(-1); return }
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (e.key === 'Enter' && active >= 0 && hits[active]) add(hits[active].term)
      else commit()
      return
    }
    if (e.key === 'Backspace' && draft === '' && tags.length > 0) onRemove(tags[tags.length - 1])
  }

  return (
    <div style={s('position:relative;')}>
      <div className="mm-input" onClick={() => inputRef.current?.focus()}>
        {tags.map(t => (
          <span key={t} className="mm-tag">
            {t}
            <button
              aria-label={`Remove ${t}`}
              onMouseDown={e => { e.preventDefault(); onRemove(t) }}
            >×</button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={draft}
          onChange={e => { setDraft(e.target.value); setActive(-1); setDismissed(false) }}
          onKeyDown={onKey}
          onBlur={commit}
          placeholder={tags.length === 0 ? placeholder : ''}
          role={suggest ? 'combobox' : undefined}
          aria-expanded={suggest ? open : undefined}
          aria-controls={suggest && open ? listId : undefined}
          aria-autocomplete={suggest ? 'list' : undefined}
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        />
      </div>

      {open && (
        <div className="mm-typeahead" id={listId} role="listbox">
          {hits.map((sg, i) => (
            <div
              key={sg.term}
              id={`${listId}-${i}`}
              className="mm-typeahead-row"
              role="option"
              aria-selected={i === active}
              // mousedown, not click: the input's onBlur would otherwise fire
              // first and commit the half-typed draft as its own tag.
              onMouseDown={e => { e.preventDefault(); add(sg.term) }}
              onMouseEnter={() => setActive(i)}
            >
              <div style={s('flex:1;min-width:0;')}>
                <div style={s('font-size:var(--fs-body);color:var(--white);')}>{sg.term}</div>
                {sg.alsoCovers.length > 0 && (
                  <div style={s('font-size:var(--fs-chip-sub);color:var(--gray2);margin-top:1px;')}>
                    also {sg.alsoCovers.join(', ')}
                  </div>
                )}
              </div>
              <span style={s('font-size:var(--fs-chip-sub);color:var(--gray2);flex-shrink:0;')}>{sg.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Persistent form state (survives unmount when navigating to a disease page) ──
const _saved = {
  species: 'all' as Species,
  breedQuery: '',
  ageCategory: undefined as AgeCategory | undefined,
  sex: undefined as SexFilter | undefined,
  neuter: undefined as NeuterFilter | undefined,
  signKeywords: [] as string[],
  diagKeywords: [] as string[],
}

// ── Main screen ───────────────────────────────────────────────────────────────
export function MixMatchScreen() {
  const nav = useNav()

  const [species, _setSpecies] = useState<Species>(_saved.species)
  const [breedQuery, _setBreedQuery] = useState(_saved.breedQuery)
  const [ageCategory, _setAgeCategory] = useState<AgeCategory | undefined>(_saved.ageCategory)
  const [sex, _setSex] = useState<SexFilter | undefined>(_saved.sex)
  const [neuter, _setNeuter] = useState<NeuterFilter | undefined>(_saved.neuter)
  const [signKeywords, _setSignKeywords] = useState<string[]>(_saved.signKeywords)
  const [diagKeywords, _setDiagKeywords] = useState<string[]>(_saved.diagKeywords)

  const setSpecies = useCallback((v: Species) => { _saved.species = v; _setSpecies(v) }, [])
  const setBreedQuery = useCallback((v: string) => { _saved.breedQuery = v; _setBreedQuery(v) }, [])
  const setAgeCategory = useCallback((v: AgeCategory | undefined) => { _saved.ageCategory = v; _setAgeCategory(v) }, [])
  const setSex = useCallback((v: SexFilter | undefined) => { _saved.sex = v; _setSex(v) }, [])
  const setNeuter = useCallback((v: NeuterFilter | undefined) => { _saved.neuter = v; _setNeuter(v) }, [])

  const addSign = useCallback((t: string) => _setSignKeywords(p => { const n = [...p, t]; _saved.signKeywords = n; return n }), [])
  const removeSign = useCallback((t: string) => _setSignKeywords(p => { const n = p.filter(x => x !== t); _saved.signKeywords = n; return n }), [])
  const addDiag = useCallback((t: string) => _setDiagKeywords(p => { const n = [...p, t]; _saved.diagKeywords = n; return n }), [])
  const removeDiag = useCallback((t: string) => _setDiagKeywords(p => { const n = p.filter(x => x !== t); _saved.diagKeywords = n; return n }), [])

  // Memoised on species: the dropdown recomputes on every keystroke, and an
  // inline closure here would defeat KeywordInput's useMemo entirely.
  const suggestSigns = useCallback(
    (q: string, exclude: string[]) => suggestSignTerms(q, { species, exclude }),
    [species],
  )

  const inputs: SearchInputs = {
    species,
    breedQuery: breedQuery.trim(),
    ageCategory,
    sex,
    neuter,
    signKeywords,
    diagKeywords,
  }

  const results: SearchCategory[] = useMemo(
    () => searchDiseases(inputs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [species, breedQuery, ageCategory, sex, neuter, signKeywords, diagKeywords],
  )

  const totalCount = results.reduce((n, g) => n + g.items.length, 0)
  const hasAnyInput = breedQuery.trim() || ageCategory || sex || neuter || signKeywords.length > 0 || diagKeywords.length > 0

  // The grouped list below is ordered by aetiology, so the single best match can
  // sit six categories down. This is the same results, globally ranked.
  const top = useMemo(() => topDifferentials(results, 5), [results])
  const termCount = signKeywords.length + diagKeywords.length

  return (
    <div style={s('padding-bottom:24px;')}>
      <header className="mm-head">
        <h1 className="mm-title">Mix &amp; Match</h1>
        <p className="mm-lede">Describe the patient. Each term you add re-scores every disease page into a ranked differential list.</p>
      </header>

      <section className="mm-step">
        <div className="mm-step-head">
          <span className="mm-step-n">1</span>
          <h2 className="mm-step-title">Signalment</h2>
        </div>
        <Field label="Species">
          <Segmented label="Species" required value={species} onChange={v => setSpecies(v ?? 'all')}
            options={[['all', 'Any'], ['dog', 'Dog'], ['cat', 'Cat']]} />
        </Field>
        <Field label="Breed">
          <input
            className="mm-input"
            placeholder="e.g. Maine Coon, Cavalier"
            value={breedQuery}
            onChange={e => setBreedQuery(e.target.value)}
          />
        </Field>
        <Field label="Age">
          <Segmented label="Age" value={ageCategory} onChange={setAgeCategory}
            options={[['neonate', 'Neonate'], ['young', 'Young'], ['middleaged', 'Adult'], ['geriatric', 'Geriatric']]} />
        </Field>
        <Field label="Sex">
          <Segmented label="Sex" value={sex} onChange={setSex}
            options={[['male', 'Male'], ['female', 'Female']]} />
        </Field>
        <Field label="Status">
          <Segmented label="Neuter status" value={neuter} onChange={setNeuter}
            options={[['intact', 'Intact'], ['neutered', 'Neutered']]} />
        </Field>
      </section>

      <section className="mm-step">
        <div className="mm-step-head">
          <span className="mm-step-n">2</span>
          <h2 className="mm-step-title">Clinical signs</h2>
          {signKeywords.length > 0 && <span className="mm-step-aside">{signKeywords.length} added</span>}
        </div>
        <KeywordInput
          tags={signKeywords}
          onAdd={addSign}
          onRemove={removeSign}
          suggest={suggestSigns}
          placeholder="Type a sign, e.g. vomiting, weight loss"
        />
        <div className="mm-hint">Pick a suggestion or press Enter to add what you typed. The number beside a suggestion is how many diseases it matches.</div>
      </section>

      <section className="mm-step">
        <div className="mm-step-head">
          <span className="mm-step-n">3</span>
          <h2 className="mm-step-title">Diagnostics</h2>
          {diagKeywords.length > 0 && <span className="mm-step-aside">{diagKeywords.length} added</span>}
        </div>
        <KeywordInput
          tags={diagKeywords}
          onAdd={addDiag}
          onRemove={removeDiag}
          placeholder="Type a finding, e.g. elevated ALP"
        />
      </section>

      {!hasAnyInput ? (
        <p className="mm-empty">Nothing entered yet. Add a sign, a finding or any part of the signalment and the differentials appear here.</p>
      ) : results.length === 0 ? (
        <p className="mm-empty">No disease matches all of that. Try broader terms.</p>
      ) : (
        <>
          <div className="mm-summary">
            {totalCount} {totalCount === 1 ? 'disease' : 'diseases'} across {results.length} {results.length === 1 ? 'category' : 'categories'}, sorted by score
          </div>

          {/* Top differentials — the grouped list below is by aetiology, not rank */}
          {top.length >= 2 && (
            <section className="mm-block">
              <h2 className="mm-block-title">Most likely</h2>
              {top.map((item, i) => {
                const d = item.disease
                const tint = MIXMATCH_CAT[item.category] ?? MIXMATCH_CAT['Other']
                const hits = item.matchedSignTerms.length + item.matchedDiagTerms.length
                return (
                  <Tappable key={d.id as string} className="mm-row"
                    onTap={() => nav.navigate({ kind: 'disease', id: d.id as string })}>
                    <span className="mm-rank-n">{i + 1}</span>
                    <div style={s('flex:1;min-width:0;')}>
                      <div className="mm-name">{d.name as string}</div>
                      <div className="mm-meta">
                        <span style={s('display:inline-flex;align-items:center;gap:5px;')}>
                          <i className="mm-dot" style={{ background: tint.col }} />{item.category}
                        </span>
                        {termCount > 0 && <span>{hits} of {termCount} {termCount === 1 ? 'term' : 'terms'}</span>}
                      </div>
                    </div>
                    <span className="mm-score">{item.score} pt</span>
                  </Tappable>
                )
              })}
            </section>
          )}

          {results.map(group => {
            const tint = MIXMATCH_CAT[group.name] ?? MIXMATCH_CAT['Other']
            return (
              <section key={group.name}>
                <div className="mm-group-head">
                  <i className="mm-dot" style={{ background: tint.col }} />
                  {group.name} <span className="mm-count">{group.items.length}</span>
                </div>
                {group.items.map(item => {
                  const d = item.disease
                  const allMatched = [...item.matchedSignTerms, ...item.matchedDiagTerms]
                  return (
                    <Tappable key={d.id as string} className="mm-row"
                      onTap={() => nav.navigate({ kind: 'disease', id: d.id as string })}>
                      <div style={s('flex:1;min-width:0;')}>
                        <div className="mm-name">{d.name as string}</div>
                        <div className="mm-meta">
                          <SpTag sp={d.sp as string} />
                          {allMatched.slice(0, 4).map(t => <span key={t} className="mm-term">{t}</span>)}
                          {allMatched.length > 4 && <span>+{allMatched.length - 4} more</span>}
                        </div>
                      </div>
                      <span className={`mm-score${item.score >= 6 ? ' is-strong' : ''}`}>{item.score} pt</span>
                      <div className="card-arrow">›</div>
                    </Tappable>
                  )
                })}
              </section>
            )
          })}
        </>
      )}
    </div>
  )
}
