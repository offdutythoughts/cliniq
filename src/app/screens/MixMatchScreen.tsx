'use client'
// ── Mix & Match screen ───────────────────────────────────────────────────────
// Users select up to 4 clinical signs + optional signalment filters and ClinIQ
// cross-references its internal data to build a differential list grouped by
// lesion category (Inflammatory, Infectious, Immune-mediated, etc.).

import { useState, useMemo } from 'react'
import { SIGNS } from '../../lib/signs/registry'
import { searchMixMatch, type Signalement, type MixMatchCategory } from '../../lib/mixmatch/engine'
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

// ── Sign picker modal ─────────────────────────────────────────────────────────
function SignPickerModal({
  selected,
  onToggle,
  onClose,
}: {
  selected: Set<string>
  onToggle: (id: string) => void
  onClose: () => void
}) {
  const [q, setQ] = useState('')
  const filtered = q ? SIGNS.filter(s => s.title.toLowerCase().includes(q.toLowerCase())) : SIGNS
  const atMax = selected.size >= 4

  return (
    <div
      style={s('position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;')}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* backdrop */}
      <div style={s('position:absolute;inset:0;background:rgba(0,0,0,0.55);')} onClick={onClose} />
      {/* sheet */}
      <div style={s('position:absolute;bottom:0;left:0;right:0;background:var(--navy2);border-radius:18px 18px 0 0;display:flex;flex-direction:column;max-height:82vh;')}>
        <div style={s('padding:16px 16px 8px;flex-shrink:0;')}>
          <div style={s('display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;')}>
            <div style={s('font-size:15px;font-weight:700;color:var(--white);')}>Add a clinical sign</div>
            <button
              onClick={onClose}
              style={s('background:none;border:none;color:var(--gray);font-size:20px;cursor:pointer;padding:0 4px;line-height:1;')}
            >×</button>
          </div>
          <input
            autoFocus
            placeholder="Search signs…"
            value={q}
            onChange={e => setQ(e.target.value)}
            style={s('width:100%;background:var(--navy3);border:1px solid var(--border);border-radius:10px;padding:8px 12px;font-size:13px;color:var(--white);outline:none;box-sizing:border-box;')}
          />
          {atMax && (
            <div style={s('margin-top:7px;font-size:11px;color:var(--amber,#f59e0b);')}>
              Maximum 4 signs selected — deselect one to swap.
            </div>
          )}
        </div>
        <div style={s('overflow-y:auto;padding:0 12px 24px;')}>
          {filtered.map(sign => {
            const sel = selected.has(sign.id)
            const disabled = atMax && !sel
            return (
              <div
                key={sign.id}
                role="button"
                onClick={() => { if (!disabled) onToggle(sign.id) }}
                style={s(`display:flex;align-items:center;gap:12px;padding:10px 8px;border-radius:10px;margin-bottom:2px;cursor:${disabled ? 'default' : 'pointer'};opacity:${disabled ? '0.4' : '1'};background:${sel ? 'rgba(var(--accent-rgb,0,200,200),0.12)' : 'transparent'};`)}
              >
                <div style={s('font-size:20px;width:28px;text-align:center;flex-shrink:0;')}>{sign.icon}</div>
                <div style={s('flex:1;min-width:0;')}>
                  <div style={s(`font-size:13px;font-weight:600;color:${sel ? 'var(--accent,var(--teal))' : 'var(--white)'};`)}>{sign.title}</div>
                  <div style={s('font-size:11px;color:var(--gray2);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;')}>{sign.sub}</div>
                </div>
                {sel && <div style={s('color:var(--accent,var(--teal));font-size:16px;flex-shrink:0;')}>✓</div>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export function MixMatchScreen() {
  const nav = useNav()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [species, setSpecies] = useState<Signalement['species']>('all')
  const [breedQuery, setBreedQuery] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

  const signById = useMemo(() => new Map(SIGNS.map(s => [s.id, s])), [])

  function toggleSign(id: string) {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  function removeSign(id: string) {
    setSelectedIds(prev => prev.filter(x => x !== id))
  }

  const signalement: Signalement = { species, breedQuery: breedQuery.trim() || undefined }

  const results: MixMatchCategory[] = useMemo(
    () => searchMixMatch(selectedIds, signalement),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedIds, species, breedQuery],
  )

  const totalCount = results.reduce((n, g) => n + g.items.length, 0)

  return (
    <div style={s('padding-bottom:24px;')}>
      {/* ── Header ── */}
      <div style={s('margin-bottom:12px;')}>
        <div style={s('font-size:11px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px;')}>
          Mix &amp; Match
        </div>
        <div style={s('font-size:12px;color:var(--gray);line-height:1.5;')}>
          Select up to 4 clinical signs to generate a cross-referenced differential list grouped by aetiology.
        </div>
      </div>

      {/* ── Selected sign chips ── */}
      <div style={s('display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;')}>
        {selectedIds.map(id => {
          const sign = signById.get(id)
          if (!sign) return null
          return (
            <div
              key={id}
              style={s('display:flex;align-items:center;gap:5px;background:var(--navy3);border:1px solid var(--border);border-radius:20px;padding:5px 10px 5px 8px;')}
            >
              <span style={s('font-size:14px;')}>{sign.icon}</span>
              <span style={s('font-size:12px;font-weight:600;color:var(--white);')}>{sign.title}</span>
              <button
                onClick={() => removeSign(id)}
                style={s('background:none;border:none;color:var(--gray2);font-size:14px;cursor:pointer;padding:0 0 0 2px;line-height:1;')}
              >×</button>
            </div>
          )
        })}

        {selectedIds.length < 4 && (
          <button
            onClick={() => setShowPicker(true)}
            style={s('display:flex;align-items:center;gap:5px;background:transparent;border:1px dashed var(--border);border-radius:20px;padding:5px 12px;font-size:12px;font-weight:600;color:var(--gray2);cursor:pointer;')}
          >
            + Add sign {selectedIds.length > 0 ? `(${selectedIds.length}/4)` : ''}
          </button>
        )}
      </div>

      {/* ── Signalment filters ── */}
      <div style={s('background:var(--navy2);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:14px;')}>
        <div style={s('font-size:10px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;')}>
          Signalment
        </div>

        {/* Species */}
        <div style={s('display:flex;gap:6px;margin-bottom:8px;')}>
          {(['all', 'dog', 'cat'] as const).map(sp => (
            <button
              key={sp}
              onClick={() => setSpecies(sp)}
              style={s(`flex:1;padding:5px;border-radius:8px;border:1px solid ${species === sp ? 'var(--teal)' : 'var(--border)'};background:${species === sp ? 'rgba(0,180,180,0.12)' : 'transparent'};color:${species === sp ? 'var(--teal)' : 'var(--gray)'};font-size:12px;font-weight:600;cursor:pointer;`)}
            >
              {sp === 'all' ? '🐾 All' : sp === 'dog' ? '🐕 Dog' : '🐈 Cat'}
            </button>
          ))}
        </div>

        {/* Breed / signalment text */}
        <input
          placeholder="Breed or signalment keyword (optional)"
          value={breedQuery}
          onChange={e => setBreedQuery(e.target.value)}
          style={s('width:100%;background:var(--navy3);border:1px solid var(--border);border-radius:8px;padding:6px 10px;font-size:12px;color:var(--white);outline:none;box-sizing:border-box;')}
        />
      </div>

      {/* ── Results ── */}
      {selectedIds.length === 0 ? (
        <div style={s('text-align:center;padding:32px 16px;')}>
          <div style={s('font-size:32px;margin-bottom:10px;')}>🔀</div>
          <div style={s('font-size:13px;color:var(--gray);')}>Select at least one clinical sign above to generate differentials.</div>
        </div>
      ) : results.length === 0 ? (
        <div style={s('text-align:center;padding:32px 16px;')}>
          <div style={s('font-size:13px;color:var(--gray);')}>No matching diseases found for this combination.</div>
        </div>
      ) : (
        <>
          <div style={s('font-size:11px;color:var(--gray2);margin-bottom:12px;')}>
            {totalCount} {totalCount === 1 ? 'disease' : 'diseases'} found across {results.length} {results.length === 1 ? 'category' : 'categories'}
            {selectedIds.length > 1 && ' — sorted by sign overlap'}
          </div>

          {results.map(group => (
            <div key={group.name} style={s('margin-bottom:18px;')}>
              <div style={s('font-size:11px;font-weight:700;color:var(--gray2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px;')}>
                {CAT_EMOJI[group.name] ?? '📋'} {group.name} ({group.items.length})
              </div>

              {group.items.map(item => {
                const d = item.disease
                const matchCount = item.matchedSignIds.length
                const showBadge = selectedIds.length > 1

                return (
                  <div
                    key={d.id}
                    className="card"
                    role="button"
                    onClick={() => nav.navigate({ kind: 'disease', id: d.id })}
                  >
                    <div className="card-row">
                      <div style={s('flex:1;min-width:0;')}>
                        <div style={s('display:flex;align-items:center;gap:6px;flex-wrap:wrap;')}>
                          <div className="card-title">{d.name as string}</div>
                          {showBadge && (
                            <span style={s(`font-size:9px;font-weight:700;padding:1px 5px;border-radius:6px;background:${matchCount >= selectedIds.length ? 'var(--teal)' : 'var(--navy3)'};color:${matchCount >= selectedIds.length ? '#fff' : 'var(--gray2)'};flex-shrink:0;`)}>
                              {matchCount}/{selectedIds.length} signs
                            </span>
                          )}
                        </div>
                        <div style={s('margin-top:3px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;')}>
                          <SpTag sp={d.sp as string} />
                          {item.matchedSignIds.map(sid => {
                            const sg = signById.get(sid)
                            return sg ? (
                              <span key={sid} style={s('font-size:10px;color:var(--gray2);')}>{sg.icon} {sg.title}</span>
                            ) : null
                          })}
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

      {/* Sign picker modal */}
      {showPicker && (
        <SignPickerModal
          selected={selectedSet}
          onToggle={id => { toggleSign(id); if (selectedIds.length + (selectedSet.has(id) ? -1 : 1) >= 4) setShowPicker(false) }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  )
}
