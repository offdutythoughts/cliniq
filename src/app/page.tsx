import { redirect } from 'next/navigation'

// The marketing homepage is not served. `/` sends visitors straight to the
// clinical app at /app, which the proxy gates behind sign-in. The page itself
// is still in git (4bd06f8) if it is ever wanted back.
export default function Home() {
  redirect('/app')
}
