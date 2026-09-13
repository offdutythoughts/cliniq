// Every clinical screen has a URL, and every one of them is served from here.
//
// An optional catch-all, so `/app`, `/app/clinical`, `/app/disease/DIS-HCM` and
// `/app/dx/coughing/exam` all render the same single-page shell. Without a route
// like this the app could still push URLs with history.pushState, but a reload
// or a pasted link would 404 — which is the whole point of having them.
//
// The view is decoded on the SERVER and handed down, so a deep link renders its
// own screen on the first paint. Decoding on the client instead would paint tab
// 0 and then jump, which reads as a bug on a shared link.
//
// A path naming content that no longer exists decodes to null; that falls back
// to the first tab rather than 404ing, because the id in the URL is more likely
// to be a renamed disease than a typo.

import type { Metadata } from 'next'
import AppShell from '../AppShell'
import { decodeView } from '../../nav/viewUrl'

export const metadata: Metadata = {
  title: 'Vetic',
  // The clinical app sits behind sign-in; keep it out of indexes regardless.
  robots: { index: false, follow: false },
}

export default async function AppPage({
  params,
  searchParams,
}: {
  params: Promise<{ view?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { view } = await params
  const sp = await searchParams
  const query = new URLSearchParams(
    Object.entries(sp).flatMap(([k, v]) =>
      v === undefined ? [] : Array.isArray(v) ? v.map(x => [k, x] as [string, string]) : [[k, v] as [string, string]],
    ),
  )
  const decoded = decodeView((view ?? []).join('/'), query)
  return <AppShell initialView={decoded ?? { kind: 'tab', tab: 0 }} />
}
