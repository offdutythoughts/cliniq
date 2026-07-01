'use client'
import { useState, useEffect } from 'react'
import { HOW_TO_ITEMS } from '../app/screens/howToItems'
import { styleStringToObject as s } from '../app/screens/style'

const STORAGE_KEY = 'cliniq-onboarding-seen'

export function OnboardingModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch { /* private mode */ }
  }, [])

  const dismiss = () => {
    try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* private mode */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      style={s('position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0.6);')}
      onClick={dismiss}
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
            onClick={dismiss}
            style={s('width:100%;padding:14px;background:var(--teal);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;letter-spacing:.01em;')}
          >
            Get started
          </button>
          <div style={s('font-size:11px;color:var(--gray2);text-align:center;margin-top:10px;')}>
            You can revisit this guide any time in Settings.
          </div>
        </div>
      </div>
    </div>
  )
}
