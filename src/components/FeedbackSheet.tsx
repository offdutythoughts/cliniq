'use client'
import { useMutation } from 'convex/react'
import { ConvexError } from 'convex/values'
import { useEffect, useRef, useState } from 'react'
import { api } from '../../convex/_generated/api'
import { CATEGORY_LABEL, type FeedbackCategory } from '../../convex/feedbackFormat'
import { track } from '../lib/analytics'

// Beta feedback, filed against the page on screen. Everything a triager needs
// to find the problem — page key, URL, species, viewport, build — is captured
// here so the reader only has to say what is wrong. Reports land in the
// `feedback` table and are read at /feedback (see convex/feedback.ts).

export interface FeedbackContext {
  pageKey: string
  /** "Disease · Chronic kidney disease" — what the inbox groups by. */
  pageLabel: string
  /** Text the reader had selected when they opened the sheet, if any. */
  quote: string
  species?: string
}

interface Props {
  context: FeedbackContext | null
  onClose: () => void
}

const CATEGORIES: { id: FeedbackCategory; hint: string }[] = [
  { id: 'wrong', hint: 'A dose, threshold, differential or fact looks incorrect' },
  { id: 'missing', hint: 'Something you expected to find is not here' },
  { id: 'bug', hint: 'Broken link, layout, or the page misbehaves' },
  { id: 'idea', hint: 'Anything that would make this page more useful' },
]

const PLACEHOLDER: Record<FeedbackCategory, string> = {
  wrong: 'What is wrong, and what should it say? A source helps if you have one.',
  missing: 'What were you looking for?',
  bug: 'What did you do, and what happened?',
  idea: 'What would help?',
}

export default function FeedbackSheet({ context, onClose }: Props) {
  const submit = useMutation(api.feedback.submit)
  const [category, setCategory] = useState<FeedbackCategory>('wrong')
  const [message, setMessage] = useState('')
  const [quote, setQuote] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const isOpen = context !== null

  // Reset on each opening (adjusting state during render, not in an effect).
  // An unsent draft survives a close-and-reopen on the same page, so a stray
  // tap on the backdrop does not throw away a long report; a new page, or a
  // report already sent, starts clean.
  const [openedFor, setOpenedFor] = useState<FeedbackContext | null>(null)
  const [draftKey, setDraftKey] = useState<string | null>(null)
  if (context !== openedFor) {
    setOpenedFor(context)
    if (context) {
      if (context.pageKey !== draftKey || state === 'sent') {
        setDraftKey(context.pageKey)
        setMessage('')
        setCategory('wrong')
        setState('idle')
      }
      setError(null)
      setQuote(context.quote)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    const t = setTimeout(() => textRef.current?.focus(), 250)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); document.removeEventListener('keydown', onKey) }
  }, [isOpen, onClose])

  async function send() {
    if (!context || !message.trim() || state === 'sending') return
    setState('sending')
    setError(null)
    try {
      await submit({
        pageKey: context.pageKey,
        pageTitle: context.pageLabel,
        path: window.location.pathname + window.location.search,
        category,
        message,
        quote: quote || undefined,
        species: context.species,
        viewport: `${window.innerWidth}×${window.innerHeight}`,
        userAgent: navigator.userAgent,
        appVersion: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || undefined,
      })
      track('feedback_sent', { category, pageKey: context.pageKey, hasQuote: Boolean(quote) })
      setState('sent')
      setTimeout(onClose, 1400)
    } catch (e) {
      setState('idle')
      setError(e instanceof ConvexError ? String(e.data) : 'Could not send — check your connection and try again.')
    }
  }

  return (
    <>
      <div
        data-feedback-overlay
        className={`fixed inset-0 bg-[rgba(0,0,0,.4)] z-[98] transition-opacity duration-[250ms] ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        data-feedback-sheet
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
        aria-hidden={!isOpen}
        className={`fixed left-0 right-0 bottom-0 mx-auto max-w-[520px] max-h-[88%] bg-(--color-surface-2) z-[99] rounded-t-2xl flex flex-col shadow-[0_-4px_24px_rgba(0,0,0,.5)] transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)] pb-[env(safe-area-inset-bottom)] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-start justify-between gap-2 pt-[14px] px-4 pb-2.5 border-b border-(--color-line)">
          <div className="min-w-0">
            <h3 id="feedback-title" className="text-[15px] font-semibold text-(--color-fg) m-0">💬 Report a problem</h3>
            <div className="mt-1 text-[11px] text-(--color-muted) overflow-hidden text-ellipsis whitespace-nowrap">
              On: <span className="text-(--color-accent) font-medium">{context?.pageLabel}</span>
            </div>
          </div>
          <button className="bg-transparent border-0 text-(--color-muted) text-[22px] cursor-pointer px-1 shrink-0" onClick={onClose} aria-label="Close feedback">&times;</button>
        </div>

        {state === 'sent' ? (
          <div className="py-10 px-4 text-center">
            <div className="text-[15px] font-semibold text-(--color-fg)">Thank you — sent.</div>
            <div className="mt-1 text-[12px] text-(--color-muted)">It is filed against this page, so we can find it.</div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-3 px-4 flex flex-col gap-3">
            <div role="radiogroup" aria-label="What kind of problem?" className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="radio"
                  aria-checked={category === c.id}
                  title={c.hint}
                  onClick={() => setCategory(c.id)}
                  className={`text-left rounded-lg border py-2 px-2.5 cursor-pointer transition-all duration-150 ${category === c.id ? 'border-(--color-accent) bg-(--color-card) text-(--color-fg)' : 'border-(--color-line) bg-transparent text-(--color-muted) hover:bg-(--color-card)'}`}
                >
                  <span className="block text-[12px] font-semibold">{CATEGORY_LABEL[c.id]}</span>
                  <span className="block text-[10px] leading-snug mt-0.5 opacity-80">{c.hint}</span>
                </button>
              ))}
            </div>

            {quote && (
              <div className="rounded-lg border border-(--color-line) bg-(--color-card) py-2 px-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[.04em] text-(--color-muted)">Selected text</span>
                  <button type="button" className="bg-transparent border-0 text-(--color-muted) text-[10px] cursor-pointer underline" onClick={() => setQuote('')}>Remove</button>
                </div>
                <div className="mt-1 text-[12px] italic text-(--color-fg) line-clamp-3">“{quote}”</div>
              </div>
            )}

            <textarea
              ref={textRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send() }}
              placeholder={PLACEHOLDER[category]}
              rows={5}
              maxLength={4000}
              aria-label="Describe the problem"
              className="w-full resize-y min-h-[110px] rounded-lg border border-(--color-line) bg-(--color-card) text-(--color-fg) text-[13px] leading-[1.5] py-2 px-2.5 outline-none focus:border-(--color-accent) [font-family:var(--font)]"
            />

            {!quote && (
              <div className="text-[10px] text-(--color-muted) -mt-1.5">
                Tip: select the exact text on the page before tapping 💬 and it is attached for you.
              </div>
            )}
            {error && <div role="alert" className="text-[12px] text-(--tone-danger-title)">{error}</div>}

            <button
              type="button"
              disabled={!message.trim() || state === 'sending'}
              onClick={send}
              className="h-10 rounded-lg border-0 bg-[var(--teal)] text-white text-[13px] font-semibold cursor-pointer transition-[filter] duration-150 hover:brightness-[1.15] disabled:opacity-50 disabled:cursor-default"
            >
              {state === 'sending' ? 'Sending…' : 'Send feedback'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
