'use client'
// ── Differential Search screen ────────────────────────────────────────────────
// Users enter signalment (species, breed, age, sex) + free-text clinical sign
// and diagnostic keywords. The engine scores all disease pages and returns a
// ranked differential list grouped by aetiology.

import { useState, useMemo, useRef, useCallback } from 'react'
import { searchDiseases, type SearchInputs, type SearchCategory, type AgeCategory, type SexFilter, type NeuterFilter, type Species } from '../../lib/search/diseaseSearch'
import { useNav } from '../nav/NavContext'
import { SpTag } from './tags'
import { styleStringToObject as s } from './style'

const CAT_EMOJI: Record<string, string> = {
  'Inflammatory':        '🔥',
  'Infectious':          '🦠',
  'Immune-mediated':     '🛡️',
  'Neoplastic':          '🔬',
  'Vascular':            '🫀',
  'Metabolic':           '⚗️',
  'Endocrine':           '🧪',
  'Structural':          '🏗️',
  'Degenerative':        '📉',
  'Neuromuscular':       '⚡',
  'Toxic':               '☠️',
  'Congenital/Inherited':'🧬',
  'Other':               '📋',
}

// ── Keyword tag input ─────────────────────────────────────────────────────────
function KeywordInput({
  tags,
  onAdd,
  onRemove,
  placeholder,
}: {
  tags: string[]
  onAdd: (t: string) => void
  onRemove: (t: string) => void
  placeholder: string
}) {
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function commit() {
    const v = draft.trim()
    if (v && !tags.includes(v.toLowerCase())) onAdd(v.toLowerCase())
    setDraft('')
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); commit() }
    if (e.key === 'Backspace' && draft === '' && tags.length > 0) onRemove(tags[tags.length - 1])
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={s('display:flex;flex-wrap:wrap;gap:5px;align-items:center;background:var(--navy3);border:1px solid var(--border);border-radius:10px;padding:6px 10px;min-height:36px;cursor:text;')}
    >
      {tags.map(t => (
        <span
          key={t}
          style={s('display:inline-flex;align-items:center;gap:4px;background:var(--navy2);border:1px solid var(--border);border-radius:12px;padding:2px 8px;font-size:11px;color:var(--white);')}
        >
          {t}
          <button
            onMouseDown={e => { e.preventDefault(); onRemove(t) }}
            style={s('background:none;border:none;color:var(--gray2);cursor:pointer;padding:0;font-size:13px;line-height:1;')}
          >×</button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onKeyDown={onKey}
        onBlur={commit}
        placeholder={tags.length === 0 ? placeholder : ''}
        style={s('flex:1;min-width:80px;background:transparent;border:none;outline:none;font-size:12px;color:var(--white);padding:0;')}
      />
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

  return (
    <div style={s('padding-bottom:24px;')}>
      {/* ── Header ── */}
      <div style={s('margin-bottom:14px;')}>
        <div style={s('font-size:11px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px;')}>
          Differential Search
        </div>
        <div style={s('font-size:12px;color:var(--gray);line-height:1.5;')}>
          Enter signalment, clinical signs, and diagnostics to generate a scored differential list.
        </div>
      </div>

      {/* ── Signalment ── */}
      <div style={s('background:var(--navy2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:10px;')}>
        <div style={s('font-size:10px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;')}>
          Signalment
        </div>

        {/* Species */}
        <div style={s('display:flex;gap:6px;margin-bottom:8px;')}>
          {(['all', 'dog', 'cat'] as Species[]).map(sp => (
            <button
              key={sp}
              onClick={() => setSpecies(sp)}
              style={s(`flex:1;padding:5px;border-radius:8px;border:1px solid ${species === sp ? 'var(--teal)' : 'var(--border)'};background:${species === sp ? 'rgba(0,180,180,0.12)' : 'transparent'};color:${species === sp ? 'var(--teal)' : 'var(--gray)'};font-size:12px;font-weight:600;cursor:pointer;`)}
            >
              {sp === 'all' ? '🐾 All' : sp === 'dog' ? '🐕 Dog' : '🐈 Cat'}
            </button>
          ))}
        </div>

        {/* Breed */}
        <input
          placeholder="Breed (e.g. Maine Coon, Cavalier)"
          value={breedQuery}
          onChange={e => setBreedQuery(e.target.value)}
          style={s('width:100%;background:var(--navy3);border:1px solid var(--border);border-radius:8px;padding:6px 10px;font-size:12px;color:var(--white);outline:none;box-sizing:border-box;margin-bottom:8px;')}
        />

        {/* Age */}
        <div style={s('margin-bottom:8px;')}>
          <div style={s('font-size:10px;color:var(--gray2);margin-bottom:5px;')}>Age</div>
          <div style={s('display:flex;gap:5px;')}>
            {([
              ['neonate',    '🍼', 'Neonate'],
              ['young',      '🐾', 'Young'],
              ['middleaged', '🐕', 'Adult'],
              ['geriatric',  '🦴', 'Geriatric'],
            ] as [AgeCategory, string, string][]).map(([id, icon, label]) => {
              const active = ageCategory === id
              return (
                <button
                  key={id}
                  onClick={() => setAgeCategory(active ? undefined : id)}
                  style={s(`flex:1;padding:5px 4px;border-radius:8px;border:1px solid ${active ? 'var(--teal)' : 'var(--border)'};background:${active ? 'rgba(0,180,180,0.12)' : 'transparent'};cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:1px;`)}
                >
                  <span style={s('font-size:14px;')}>{icon}</span>
                  <span style={s(`font-size:10px;font-weight:700;color:${active ? 'var(--teal)' : 'var(--white)'};`)}>{label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Sex + neuter status — independent, one choice from each row */}
        <div style={s('display:flex;gap:8px;')}>
          <div style={s('flex:1;')}>
            <div style={s('font-size:10px;color:var(--gray2);margin-bottom:5px;')}>Sex</div>
            <div style={s('display:flex;gap:5px;')}>
              {([
                ['male',   '♂', 'Male'],
                ['female', '♀', 'Female'],
              ] as [SexFilter, string, string][]).map(([id, icon, label]) => {
                const active = sex === id
                return (
                  <button
                    key={id}
                    onClick={() => setSex(active ? undefined : id)}
                    style={s(`flex:1;padding:5px 4px;border-radius:8px;border:1px solid ${active ? 'var(--teal)' : 'var(--border)'};background:${active ? 'rgba(0,180,180,0.12)' : 'transparent'};cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:1px;`)}
                  >
                    <span style={s(`font-size:13px;color:${active ? 'var(--teal)' : 'var(--gray2)'};`)}>{icon}</span>
                    <span style={s(`font-size:10px;font-weight:700;color:${active ? 'var(--teal)' : 'var(--white)'};`)}>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div style={s('flex:1;')}>
            <div style={s('font-size:10px;color:var(--gray2);margin-bottom:5px;')}>Neuter status</div>
            <div style={s('display:flex;gap:5px;')}>
              {([
                ['intact',   '●', 'Intact'],
                ['neutered', '○', 'Neutered'],
              ] as [NeuterFilter, string, string][]).map(([id, icon, label]) => {
                const active = neuter === id
                return (
                  <button
                    key={id}
                    onClick={() => setNeuter(active ? undefined : id)}
                    style={s(`flex:1;padding:5px 4px;border-radius:8px;border:1px solid ${active ? 'var(--teal)' : 'var(--border)'};background:${active ? 'rgba(0,180,180,0.12)' : 'transparent'};cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:1px;`)}
                  >
                    <span style={s(`font-size:13px;color:${active ? 'var(--teal)' : 'var(--gray2)'};`)}>{icon}</span>
                    <span style={s(`font-size:10px;font-weight:700;color:${active ? 'var(--teal)' : 'var(--white)'};`)}>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Clinical signs ── */}
      <div style={s('margin-bottom:10px;')}>
        <div style={s('font-size:10px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px;')}>
          Clinical Signs
        </div>
        <KeywordInput
          tags={signKeywords}
          onAdd={addSign}
          onRemove={removeSign}
          placeholder="Type a sign and press Enter (e.g. vomiting, weight loss)"
        />
        <div style={s('font-size:10px;color:var(--gray2);margin-top:4px;')}>Press Enter or comma to add each term</div>
      </div>

      {/* ── Diagnostics ── */}
      <div style={s('margin-bottom:14px;')}>
        <div style={s('font-size:10px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px;')}>
          Diagnostics
        </div>
        <KeywordInput
          tags={diagKeywords}
          onAdd={addDiag}
          onRemove={removeDiag}
          placeholder="Type a finding and press Enter (e.g. elevated ALP, thrombocytopenia)"
        />
      </div>

      {/* ── Results ── */}
      {!hasAnyInput ? (
        <div style={s('text-align:center;padding:32px 16px;')}>
          <div style={s('font-size:32px;margin-bottom:10px;')}>🔍</div>
          <div style={s('font-size:13px;color:var(--gray);')}>Enter signalment, clinical signs, or diagnostic findings above to generate differentials.</div>
        </div>
      ) : results.length === 0 ? (
        <div style={s('text-align:center;padding:32px 16px;')}>
          <div style={s('font-size:13px;color:var(--gray);')}>No matching diseases found. Try broader terms.</div>
        </div>
      ) : (
        <>
          <div style={s('font-size:11px;color:var(--gray2);margin-bottom:12px;')}>
            {totalCount} {totalCount === 1 ? 'disease' : 'diseases'} across {results.length} {results.length === 1 ? 'category' : 'categories'} — sorted by relevance
          </div>

          {results.map(group => (
            <div key={group.name} style={s('margin-bottom:18px;')}>
              <div style={s('font-size:11px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px;')}>
                {CAT_EMOJI[group.name] ?? '📋'} {group.name} ({group.items.length})
              </div>

              {group.items.map(item => {
                const d = item.disease
                const allMatched = [...item.matchedSignTerms, ...item.matchedDiagTerms]

                return (
                  <div
                    key={d.id as string}
                    className="card"
                    role="button"
                    onClick={() => nav.navigate({ kind: 'disease', id: d.id as string })}
                  >
                    <div className="card-row">
                      <div style={s('flex:1;min-width:0;')}>
                        <div style={s('display:flex;align-items:center;gap:6px;flex-wrap:wrap;')}>
                          <div className="card-title">{d.name as string}</div>
                          <span style={s(`font-size:9px;font-weight:700;padding:1px 6px;border-radius:6px;background:${item.score >= 6 ? 'var(--teal)' : item.score >= 3 ? 'var(--navy3)' : 'var(--navy3)'};color:${item.score >= 6 ? '#fff' : 'var(--gray2)'};border:1px solid ${item.score >= 6 ? 'transparent' : 'var(--border)'};flex-shrink:0;`)}>
                            {item.score}pt
                          </span>
                        </div>
                        <div style={s('margin-top:4px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;')}>
                          <SpTag sp={d.sp as string} />
                          {allMatched.slice(0, 4).map(t => (
                            <span key={t} style={s('font-size:10px;color:var(--gray2);background:var(--navy3);border-radius:4px;padding:1px 5px;')}>{t}</span>
                          ))}
                          {allMatched.length > 4 && (
                            <span style={s('font-size:10px;color:var(--gray2);')}>+{allMatched.length - 4} more</span>
                          )}
                        </div>
                      </div>
                      <div className="card-arrow">›</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
