'use client'

import { unstable_catchError as catchError } from 'next/error'

// A component-level error boundary that renders nothing when its children throw.
// Use it to wrap NON-CRITICAL widgets (e.g. the onboarding welcome sheet, which
// runs a Convex query) so that a single failing query degrades to "widget
// hidden" instead of taking down the entire app. Regressions like a backend
// function missing on prod should never lock users out over a cosmetic popup.
export default catchError(() => null)
