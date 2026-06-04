import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
  capture_pageview: false, // we handle pageviews manually via onRouterTransitionStart
  capture_pageleave: true,
  autocapture: true, // captures clicks, inputs, etc. automatically
  defaults: '2026-01-30',
})

export function onRouterTransitionStart(url: string) {
  posthog.capture('$pageview', { $current_url: url })
}
