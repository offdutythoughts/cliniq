'use client'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { HOW_TO_ITEMS } from '../app/screens/howToItems'
import { styleStringToObject as s } from '../app/screens/style'
import { useTutorial } from '../app/tutorial/TutorialContext'

const STORAGE_KEY = 'cliniq-onboarding-seen'

// Convex mode persists "seen" per user; the standalone local build has no auth
// so it falls back to localStorage only.
const hasConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)

function readLocalSeen(): boolean {
  try { return Boolean(localStorage.getItem(STORAGE_KEY)) } catch { return false }
}
function writeLocalSeen() {
  try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* private mode */ }
}

export function OnboardingModal() {
  return hasConvex ? <OnboardingConvex /> : <OnboardingLocal />
}

// Standalone build (no backend): device-local persistence only.
function OnboardingLocal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!readLocalSeen()) setVisible(true)
  }, [])

  const dismiss = () => {
    writeLocalSeen()
    setVisible(false)
  }

  return <OnboardingSheet visible={visible} onDismiss={dismiss} />
}

// Convex build: the welcome sheet is gated on a server-side per-user flag so it
// only ever shows to genuinely new accounts — and stays dismissed across
// re-logins / devices even when mobile Safari evicts localStorage.
function OnboardingConvex() {
  const status = useQuery(api.onboarding.status)
  const markSeen = useMutation(api.onboarding.markSeen)
  const [dismissed, setDismissed] = useState(false)

  // Migrate legacy users who already dismissed on this device: record it
  // server-side so we never re-prompt them, without showing the sheet.
  useEffect(() => {
    if (status?.authenticated && !status.seen && readLocalSeen()) {
      void markSeen()
    }
  }, [status, markSeen])

  const dismiss = () => {
    setDismissed(true)
    writeLocalSeen()
    void markSeen()
  }

  const visible =
    !dismissed &&
    status?.authenticated === true &&
    status.seen === false &&
    !readLocalSeen()

  return <OnboardingSheet visible={visible} onDismiss={dismiss} />
}

function OnboardingSheet({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  const { start: startTutorial } = useTutorial()

  const startTour = () => {
    onDismiss()
    startTutorial()
  }

  if (!visible) return null

  return (
    <div
      style={s('position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0.6);')}
      onClick={onDismiss}
    >
      <div
        style={s('background:var(--navy2);border:1px solid var(--border);border-radius:20px 20px 0 0;width:100%;max-width:480px;max-height:90dvh;display:flex;flex-direction:column;overflow:hidden;')}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={s('padding:20px 20px 0;flex-shrink:0;')}>
          <div style={s('width:36px;height:4px;background:var(--border2);border-radius:2px;margin:0 auto 18px;')} />
          <div style={s('font-size:20px;font-weight:700;color:var(--white);margin-bottom:4px;')}>Welcome to ClinIQ</div>
          <div style={s('font-size:13px;color:var(--gray);margin-bottom:16px;')}>A few things to know before you dive in.</div>
        </div>

        {/* Scrollable list */}
        <div style={s('overflow-y:auto;padding:0 20px;flex:1;min-height:0;')}>
          {HOW_TO_ITEMS.map((item, i) => (
            <div
              key={item.title}
              style={s(`display:flex;align-items:flex-start;gap:14px;padding:14px 0;${i < HOW_TO_ITEMS.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}`)}
            >
              <div style={s('font-size:22px;line-height:1;flex-shrink:0;margin-top:1px;')}>{item.icon}</div>
              <div>
                <div style={s('font-size:13px;font-weight:600;color:var(--white);margin-bottom:3px;')}>{item.title}</div>
                <div style={s('font-size:12px;color:var(--gray);line-height:1.5;')}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={s('padding:16px 20px;flex-shrink:0;border-top:1px solid var(--border);')}>
          <button
            onClick={startTour}
            style={s('width:100%;padding:14px;background:var(--teal);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;letter-spacing:.01em;')}
          >
            Take the interactive tour
          </button>
          <button
            onClick={onDismiss}
            style={s('width:100%;padding:12px;background:transparent;color:var(--gray);border:none;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;margin-top:6px;')}
          >
            Skip for now
          </button>
          <div style={s('font-size:11px;color:var(--gray2);text-align:center;margin-top:8px;')}>
            You can revisit the tour and this guide any time in Settings.
          </div>
        </div>
      </div>
    </div>
  )
}
