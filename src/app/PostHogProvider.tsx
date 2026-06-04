'use client'

import posthog from 'posthog-js'
import { useQuery } from 'convex/react'
import { useEffect } from 'react'
import { api } from '../../convex/_generated/api'

export function PostHogIdentify() {
  const me = useQuery(api.users.me)

  useEffect(() => {
    if (me?._id) {
      posthog.identify(me._id, { email: me.email })
    }
  }, [me?._id, me?.email])

  return null
}
