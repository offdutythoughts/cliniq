// Shared urgency / species tag helpers — React ports of urgTag/spTag/urgClass
// (cliniqApp.ts). Same .tag .tag-* classes from globals.css.

export function SpTag({ sp }: { sp?: string }) {
  if (!sp) return null
  if (sp === 'Dog') return <span className="tag tag-sp-dog">Dog</span>
  if (sp === 'Cat') return <span className="tag tag-sp-cat">Cat</span>
  return <span className="tag tag-sp-all">Dog + Cat</span>
}

export function UrgTag({ urg }: { urg?: string }) {
  if (!urg) return null
  const u = urg.toUpperCase()
  if (u === 'EMERGENCY') return <span className="tag tag-em">⚠️ EMERGENCY</span>
  if (u === 'HIGH') return <span className="tag tag-hi">↑ High</span>
  if (urg === 'Moderate' || urg === 'Moderate–High' || urg === 'Low–Moderate') return <span className="tag tag-mo">Moderate</span>
  return <span className="tag tag-lo">Low</span>
}

/** Extra className for a lesion card by urgency (' em' | ' hi' | ''). */
export function urgClass(urg?: string): string {
  if (!urg) return ''
  const u = urg.toUpperCase()
  if (u === 'EMERGENCY') return ' em'
  if (u === 'HIGH') return ' hi'
  return ''
}
