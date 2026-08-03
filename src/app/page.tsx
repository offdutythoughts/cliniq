import { redirect } from 'next/navigation'

// The marketing homepage is not served here. `/` sends visitors straight to the
// clinical app at /app, which the proxy gates behind sign-in. The marketing page
// itself is untouched on main and is restored by reverting this file.
export default function Home() {
  redirect('/app')
}
