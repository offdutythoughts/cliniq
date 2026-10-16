'use client'

import { useMutation, useQuery } from 'convex/react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { api } from '../../../convex/_generated/api'
import type { Doc } from '../../../convex/_generated/dataModel'
import {
  CATEGORY_LABEL,
  toMarkdown,
  type FeedbackCategory,
  type FeedbackStatus,
} from '../../../convex/feedbackFormat'

/**
 * The beta-feedback inbox. Reports are grouped by the page they were filed on,
 * busiest page first, so a triager fixes a page's whole backlog in one visit.
 * Readable only by the emails in the `feedbackAdmins` table; everyone
 * else gets a "not available" note (the middleware already requires sign-in).
 */
export default function FeedbackPage() {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) return null
  return <Inbox />
}

type Row = Omit<Doc<'feedback'>, 'userId'>

const STATUSES: { id: FeedbackStatus; label: string }[] = [
  { id: 'new', label: 'New' },
  { id: 'triaged', label: 'Triaged' },
  { id: 'fixed', label: 'Fixed' },
  { id: 'wontfix', label: "Won't fix" },
]

const CATEGORY_TONE: Record<FeedbackCategory, string> = {
  wrong: 'var(--tone-danger-title)',
  missing: 'var(--color-accent)',
  bug: 'var(--color-muted)',
  idea: 'var(--teal)',
}

const chip = 'rounded-full border py-1 px-2.5 text-[11px] cursor-pointer transition-all duration-150'
const chipOn = 'border-(--color-accent) bg-(--color-card) text-(--color-fg) font-semibold'
const chipOff = 'border-(--color-line) bg-transparent text-(--color-muted) hover:bg-(--color-card)'
const actBtn = 'rounded-md border border-(--color-line) bg-transparent text-(--color-muted) text-[10px] py-1 px-2 cursor-pointer hover:bg-(--color-card) hover:text-(--color-fg)'

function Inbox() {
  const [status, setStatus] = useState<FeedbackStatus>('new')
  const [category, setCategory] = useState<FeedbackCategory | 'all'>('all')
  const [copied, setCopied] = useState(false)
  const rows = useQuery(api.feedback.inbox, { status })
  const counts = useQuery(api.feedback.counts)

  const shown = useMemo(
    () => (rows ?? []).filter((r) => category === 'all' || r.category === category),
    [rows, category],
  )
  const groups = useMemo(() => {
    const byPage = new Map<string, Row[]>()
    for (const r of shown) byPage.set(r.pageKey, [...(byPage.get(r.pageKey) ?? []), r])
    return [...byPage.values()].sort((a, b) => b.length - a.length)
  }, [shown])

  async function copyMarkdown() {
    await navigator.clipboard.writeText(toMarkdown(shown))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-(--color-surface)">
      <div className="max-w-[760px] mx-auto px-4 pt-[calc(16px+env(safe-area-inset-top))] pb-16">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-[18px] font-semibold text-(--color-fg) m-0">💬 Feedback inbox</h1>
          <Link href="/app" className="text-[12px] text-(--color-accent) no-underline">← Back to Vetic</Link>
        </div>

        {rows === null ? (
          <p className="mt-6 text-[13px] text-(--color-muted)">
            The inbox is only available to the feedback team. Ask an admin to add your email
            with <code>feedback:setAdmins</code> on the Convex deployment.
          </p>
        ) : (
          <>
            <div className="mt-4 flex flex-wrap gap-1.5" role="tablist" aria-label="Status">
              {STATUSES.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={status === s.id}
                  className={`${chip} ${status === s.id ? chipOn : chipOff}`}
                  onClick={() => setStatus(s.id)}
                >
                  {s.label}{counts ? ` · ${counts[s.id]}` : ''}
                </button>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {(['all', 'wrong', 'missing', 'bug', 'idea'] as const).map((c) => (
                <button
                  key={c}
                  className={`${chip} ${category === c ? chipOn : chipOff}`}
                  onClick={() => setCategory(c)}
                >
                  {c === 'all' ? 'All types' : CATEGORY_LABEL[c]}
                </button>
              ))}
              <button
                className={`${actBtn} ml-auto`}
                onClick={copyMarkdown}
                disabled={shown.length === 0}
                title="Copy these reports as Markdown, grouped by page — paste into an issue or a Claude session"
              >
                {copied ? 'Copied ✓' : '📋 Copy as Markdown'}
              </button>
            </div>

            {rows === undefined ? (
              <p className="mt-6 text-[13px] text-(--color-muted)">Loading…</p>
            ) : groups.length === 0 ? (
              <p className="mt-6 text-[13px] text-(--color-muted)">Nothing here.</p>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {groups.map((list) => (
                  <section key={list[0].pageKey} className="rounded-xl border border-(--color-line) bg-(--color-surface-2)">
                    <header className="flex items-center justify-between gap-2 py-2.5 px-3.5 border-b border-(--color-line)">
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-(--color-fg) overflow-hidden text-ellipsis whitespace-nowrap">
                          {list[0].pageTitle || list[0].pageKey}
                          <span className="ml-1.5 text-(--color-muted) font-normal">({list.length})</span>
                        </div>
                        <div className="text-[10px] text-(--color-muted) font-mono">{list[0].pageKey}</div>
                      </div>
                      <Link href={list[0].path} className="shrink-0 text-[11px] text-(--color-accent) no-underline">Open page ↗</Link>
                    </header>
                    <ul className="list-none m-0 p-0">
                      {list.map((r) => <Item key={r._id} row={r} />)}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function Item({ row }: { row: Row }) {
  const setStatus = useMutation(api.feedback.setStatus)
  const [note, setNote] = useState(row.resolution ?? '')
  const [busy, setBusy] = useState(false)

  async function move(status: FeedbackStatus) {
    setBusy(true)
    try {
      await setStatus({ id: row._id, status, resolution: note })
    } finally {
      setBusy(false)
    }
  }

  const meta = [
    row.userEmail,
    new Date(row._creationTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }),
    row.species,
    row.viewport,
    row.appVersion && `build ${row.appVersion}`,
  ].filter(Boolean).join(' · ')

  return (
    <li className="py-3 px-3.5 border-b border-(--color-line) last:border-b-0">
      <div className="text-[10px] font-semibold uppercase tracking-[.04em]" style={{ color: CATEGORY_TONE[row.category] }}>
        {CATEGORY_LABEL[row.category]}
      </div>
      {row.quote && (
        <blockquote className="mt-1.5 mb-0 mx-0 border-l-2 border-(--color-line) pl-2 text-[12px] italic text-(--color-muted)">
          “{row.quote}”
        </blockquote>
      )}
      <p className="mt-1.5 mb-0 text-[13px] leading-[1.55] text-(--color-fg) whitespace-pre-wrap">{row.message}</p>
      <div className="mt-1.5 text-[10px] text-(--color-muted)" title={row.userAgent}>{meta}</div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Triage note (what changed / why not)"
          aria-label="Triage note"
          className="flex-1 min-w-[160px] h-7 rounded-md border border-(--color-line) bg-(--color-card) text-(--color-fg) text-[11px] px-2 outline-none focus:border-(--color-accent)"
        />
        {STATUSES.filter((s) => s.id !== row.status).map((s) => (
          <button key={s.id} className={actBtn} disabled={busy} onClick={() => move(s.id)}>
            {s.id === 'new' ? 'Reopen' : s.label}
          </button>
        ))}
      </div>
    </li>
  )
}
