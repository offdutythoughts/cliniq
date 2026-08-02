import { FLOWS } from '../src/lib/signs/flows/index'
for (const p of Object.values(FLOWS) as any[]) {
  const walk = (blocks: any[]) => {
    for (const b of blocks) {
      if (b.kind === 'branch') b.columns.forEach((c: any) => walk(c.blocks ?? []))
      if (b.kind === 'fork') b.legs.forEach((l: any) => walk(l.blocks ?? []))
      if (b.kind === 'html') {
        for (const m of b.html.matchAll(/flow-arrow-v[^]{0,200}?grid-template-columns:([^;"]+)/g)) {
          console.log(p.id, '|', JSON.stringify(m[0].slice(0, 60).replace(/\s+/g, ' ')), '→', m[1])
        }
      }
    }
  }
  walk(p.blocks)
}
