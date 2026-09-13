'use client'
// Generic empty/not-found state. Reached with an unknown id — a stale saved
// note, a link to content that has since been renamed, or a typo'd deep link.
//
// It used to print "Not found" and nothing else: no back button, no route
// anywhere. The bottom nav is still on screen, so the reader is not truly
// stranded, but the page itself offered no way out of a state it had just put
// them in. Recovery is the page's job, not the reader's.

import { useNav } from '../nav/NavContext'
import { Tappable } from './Tappable'
import { styleStringToObject as s } from './style'

const ACTIONS = s('display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;')
const ACTION = s('padding:8px 14px;border-radius:9px;border:1px solid var(--border2);background:var(--card);color:var(--white);font-size:var(--fs-body);font-weight:600;cursor:pointer;')

export function NotFound({ what = 'This page' }: { what?: string }) {
  const nav = useNav()
  const canGoBack = nav.stack.length > 0
  return (
    <div className="empty">
      <h3>Not found</h3>
      <p>{what} is not available. It may have been renamed, or the link that got you here may be out of date.</p>
      <div style={ACTIONS}>
        {canGoBack && (
          <Tappable style={ACTION} onTap={nav.goBack}>← Go back</Tappable>
        )}
        <Tappable style={ACTION} onTap={() => nav.navTo(0)}>Clinical signs</Tappable>
      </div>
    </div>
  )
}
