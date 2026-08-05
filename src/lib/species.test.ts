import { describe, it, expect } from 'vitest'
import {
  speciesOf, soleSpecies, markerOf, scopeToSpecies, hasSpeciesScope, rareSpecies, speciesMode,
  scopedSegments, segmentApplies, segmentText, crossTalkOf,
} from './species'
import { DB } from '../data/db'

describe('speciesOf', () => {
  it('parses every sp spelling in the DB', () => {
    expect(speciesOf('Dog')).toEqual(['Dog'])
    expect(speciesOf('Cat')).toEqual(['Cat'])
    expect(speciesOf('Dog + Cat')).toEqual(['Cat', 'Dog'])
    expect(speciesOf('Cat + Dog')).toEqual(['Cat', 'Dog'])
    expect(speciesOf('Dog (rarely Cat)')).toEqual(['Cat', 'Dog'])
    expect(speciesOf('Cat (rarely Dog)')).toEqual(['Cat', 'Dog'])
    expect(speciesOf(undefined)).toEqual([])
  })

  it('leaves no disease page unclassified', () => {
    const orphans = DB.disease_page.filter(d => speciesOf(d.sp).length === 0)
    expect(orphans.map(d => `${d.id} sp=${d.sp}`)).toEqual([])
  })
})

describe('soleSpecies', () => {
  it('only fires when the row is unambiguous', () => {
    expect(soleSpecies('Cat')).toBe('Cat')
    expect(soleSpecies('Dog')).toBe('Dog')
    expect(soleSpecies('Dog + Cat')).toBeNull()
    // Rarity in the other species still means the page covers both.
    expect(soleSpecies('Dog (rarely Cat)')).toBeNull()
  })
})

describe('markerOf', () => {
  it('accepts the authored marker forms', () => {
    expect(markerOf('Dog: Labrador')).toEqual({ sp: 'Dog', text: 'Labrador' })
    expect(markerOf('Cats: Siamese')).toEqual({ sp: 'Cat', text: 'Siamese' })
    expect(markerOf('Feline — DSH')).toEqual({ sp: 'Cat', text: 'DSH' })
    expect(markerOf('Canine - Boxer')).toEqual({ sp: 'Dog', text: 'Boxer' })
  })

  it('restores sentence case once the marker is stripped', () => {
    // Authored when the "Cat:" prefix always rendered — without this the bullet
    // would start mid-sentence.
    expect(markerOf('Cat: amlodipine 0.625 mg/cat PO SID').text).toBe('Amlodipine 0.625 mg/cat PO SID')
  })

  it('leaves an intentionally-cased first word alone', () => {
    expect(markerOf('Dog: pH falls before the anion gap rises').text).toBe('pH falls before the anion gap rises')
    expect(markerOf('Cat: mRNA assays are not validated').text).toBe('mRNA assays are not validated')
    expect(markerOf('Dog: 2 mg/kg PO q12h').text).toBe('2 mg/kg PO q12h')
  })

  it('does not mistake hyphenated words for markers', () => {
    expect(markerOf('Dog-appeasing pheromone helps').sp).toBeNull()
    expect(markerOf('Cat-scratch disease').sp).toBeNull()
    expect(markerOf('Dogs and cats are both affected').sp).toBeNull()
  })
})

describe('scopeToSpecies', () => {
  it('keeps shared text and drops the other species', () => {
    const m = 'Dog: Labrador, Boxer|Cat: Siamese, DSH|Any breed can be affected'
    expect(scopeToSpecies(m, 'Cat')).toBe('Siamese, DSH|Any breed can be affected')
    expect(scopeToSpecies(m, 'Dog')).toBe('Labrador, Boxer|Any breed can be affected')
  })

  it('scopes a whole section under a species-only header', () => {
    const m = '#Dog|Polyphagia|Weight gain|#Cat|Weight loss'
    expect(scopeToSpecies(m, 'Cat')).toBe('Weight loss')
    expect(scopeToSpecies(m, 'Dog')).toBe('Polyphagia|Weight gain')
  })

  it('keeps normal headers and their shared blocks', () => {
    const m = '#Tier 1|CBC, biochemistry|Dog: ACTH stimulation|Cat: Total T4'
    expect(scopeToSpecies(m, 'Cat')).toBe('#Tier 1|CBC, biochemistry|Total T4')
  })

  it('drops a normal header left bare by scoping', () => {
    const m = 'Baseline bloods|#Breed screening|Dog: hip radiographs'
    expect(scopeToSpecies(m, 'Cat')).toBe('Baseline bloods')
  })

  it('preserves sub-bullet markers', () => {
    const m = 'Imaging|-Dog: dual-phase CT|-Cat: abdominal ultrasound'
    expect(scopeToSpecies(m, 'Cat')).toBe('Imaging|-Abdominal ultrasound')
  })

  it('splits both species out of a single segment', () => {
    // The commonest authored shape — one bullet covering both species.
    const m = 'Dog: Female overrepresented. Cat: No sex predilection.'
    expect(scopeToSpecies(m, 'Cat')).toBe('No sex predilection.')
    expect(scopeToSpecies(m, 'Dog')).toBe('Female overrepresented.')
  })

  it('keeps shared preamble ahead of an inline marker', () => {
    const m = 'Supportive care throughout. Cat: Add mirtazapine.'
    expect(scopeToSpecies(m, 'Dog')).toBe('Supportive care throughout.')
    expect(scopeToSpecies(m, 'Cat')).toBe('Supportive care throughout. Add mirtazapine.')
  })

  it('lets an explicit marker override the enclosing section', () => {
    // A "Cats:" bullet under a "#Dogs" heading is about cats.
    const m = '#Dogs|Endocarditis, murmur|Cats: Mostly subclinical bacteraemia'
    expect(scopeToSpecies(m, 'Cat')).toBe('Mostly subclinical bacteraemia')
    expect(scopeToSpecies(m, 'Dog')).toBe('Endocarditis, murmur')
  })

  it('scopes a section headed by a species qualifier', () => {
    // The hypothyroidism leak: "#Iatrogenic / Cats" read as an ordinary header,
    // so its feline section rendered under the Dog tab.
    const m = 'Lymphocytic thyroiditis|#Iatrogenic / Cats|Post-radioiodine or thyroidectomy'
    expect(scopeToSpecies(m, 'Dog')).toBe('Lymphocytic thyroiditis')
    // The heading keeps everything except the species — "Iatrogenic" is the
    // clinically meaningful half and has to survive.
    expect(scopeToSpecies(m, 'Cat')).toBe('Lymphocytic thyroiditis|#Iatrogenic|Post-radioiodine or thyroidectomy')
  })

  it('keeps the non-species half of a scoped heading', () => {
    // Feline lymphoma authors two protocols under "#Cats — small cell" and
    // "#Cats — large cell". Dropping the headings whole ran chlorambucil and
    // CHOP together into one undifferentiated list.
    const m = '#Cats — small cell lymphoma|Chlorambucil 2 mg/cat|#Cats — large cell lymphoma|COP or CHOP'
    expect(scopeToSpecies(m, 'Cat'))
      .toBe('#Small cell lymphoma|Chlorambucil 2 mg/cat|#Large cell lymphoma|COP or CHOP')
    // A heading that is ONLY the species still disappears.
    expect(scopeToSpecies('#Cats|Weight loss', 'Cat')).toBe('Weight loss')
  })

  it('reads a leading species emoji as a marker', () => {
    // 166 bullets use this convention. Missed, they read as shared — so canine
    // causes showed under Cat and vanished from Dog on retinal detachment.
    const m = '🐱 Systemic hypertension|🐕 Systemic mycoses|Neoplasia'
    expect(scopeToSpecies(m, 'Cat')).toBe('Systemic hypertension|Neoplasia')
    expect(scopeToSpecies(m, 'Dog')).toBe('Systemic mycoses|Neoplasia')
  })

  it('treats a bracketed prevalence note as shared, not a scope', () => {
    // "(most common in cats)" heads a block listing BOTH species' causes.
    const m = '#Exudative (most common in cats)|🐕 Systemic mycoses|🐱 Hyperviscosity'
    expect(scopeToSpecies(m, 'Dog')).toBe('#Exudative (most common in cats)|Systemic mycoses')
    // A bracketed QUALIFIER still scopes — this one heads a block of feline
    // doses, which were showing on the Dog tab.
    const q = '#Infectious|Clindamycin for toxo|#Hypertensive emergency (older cat)|Amlodipine 0.625 mg/cat PO q24h'
    expect(scopeToSpecies(q, 'Dog')).toBe('#Infectious|Clindamycin for toxo')
    // A bracket naming only the species still scopes.
    const p = 'Increase water intake|#Prevention (dog)|Tiopronin 15 mg/kg'
    expect(scopeToSpecies(p, 'Cat')).toBe('Increase water intake')
    // The species drops out of the heading; "Prevention" stays.
    expect(scopeToSpecies(p, 'Dog')).toBe('Increase water intake|#Prevention|Tiopronin 15 mg/kg')
  })

  it('does not scope on a species word buried in prose', () => {
    // This header lists doses for BOTH species; treating it as a Dog section
    // would hide the cat dose entirely.
    const m = '#Second agent if no response in 5-7 days, relapse on taper, large/steroid-intolerant dogs|Ciclosporin: dog 3-11 mg/kg; cat 5 mg/kg'
    expect(scopeToSpecies(m, 'Cat')).toBe(m)
  })

  it('falls back to the full field rather than emptying a card', () => {
    // Lymphoma tx1 is entirely "#CHOP protocol — dogs". Scoping it away would
    // leave the Cat tab an empty Treatment card, which reads as "no treatment".
    const m = '#CHOP protocol — dogs (Ettinger Ch 322)|Wk1: L-asparaginase 10,000 U/m² SC'
    const cat = scopeToSpecies(m, 'Cat')
    expect(cat).toBe(m)
    // The heading survives, so the text stays labelled as canine.
    expect(cat).toContain('dogs')
  })

  it('leaves unscoped text untouched', () => {
    const m = 'Middle-aged to older.'
    expect(scopeToSpecies(m, 'Cat')).toBe(m)
  })
})

describe('scopedSegments', () => {
  it('is the shared model behind rendering, calibration and lint', () => {
    const segs = scopedSegments('#Cats — small cell|Chlorambucil|-Dog: Vincristine|Shared line')
    expect(segs.map(s => s.kind)).toEqual(['header', 'body', 'body', 'body'])
    // The heading scopes its section, and the blocks beneath inherit it…
    expect(segs[0].headerSp).toBe('Cat')
    expect(segs[1].section).toBe('Cat')
    // …unless a block carries its own marker, which wins.
    expect(segs[2].runs[0].sp).toBe('Dog')
    expect(segs[2].lead).toBe('-')
    expect(segs[3].runs[0].sp).toBeNull()
  })

  it('agrees with what scopeToSpecies renders', () => {
    const m = '#Cats — small cell|Chlorambucil|Shared line'
    const rendered = scopedSegments(m)
      .filter(s => segmentApplies(s, 'Cat'))
      .map(s => segmentText(s, 'Cat'))
      .filter(Boolean)
      .join('|')
    expect(rendered).toBe(scopeToSpecies(m, 'Cat'))
  })
})

describe('crossTalkOf', () => {
  it('only reports pages that actually filter', () => {
    // A 'shared' page shows everything anyway, so nothing is misplaced.
    expect(crossTalkOf({ id: 'X', sp: 'Dog + Cat', signs: 'Common in cats' })).toEqual([])
  })

  it('ignores fields the disease page never renders', () => {
    const row = DB.disease_page.find(d => d.id === 'DIS-INFECT-BART')!
    expect(crossTalkOf(row).some(c => c.field === 'synonyms')).toBe(false)
  })
})

describe('hasSpeciesScope', () => {
  it('detects both marker styles', () => {
    expect(hasSpeciesScope('Dog: Labrador|Cat: Siamese')).toBe(true)
    expect(hasSpeciesScope('#Cat|Weight loss')).toBe(true)
    expect(hasSpeciesScope('Any breed|Middle-aged')).toBe(false)
  })
})

describe('rareSpecies', () => {
  it('reads the parenthesised rarity', () => {
    expect(rareSpecies('Dog (rarely Cat)')).toBe('Cat')
    expect(rareSpecies('Cat (rarely Dog)')).toBe('Dog')
    expect(rareSpecies('Dog + Cat')).toBeNull()
  })
})

describe('speciesMode', () => {
  it('is single for a one-species page', () => {
    expect(speciesMode({ sp: 'Cat', signs: 'Weight loss' })).toBe('single')
  })

  it('is shared when both species read the same', () => {
    expect(speciesMode({ sp: 'Dog + Cat', signs: 'PU/PD, weight loss', tx1: 'Renal diet' }))
      .toBe('shared')
  })

  it('is split once two or more clinical fields diverge', () => {
    expect(speciesMode({
      sp: 'Dog + Cat',
      signs: 'Dog: Polyphagia|Cat: Weight loss',
      tx1: 'Dog: Trilostane|Cat: Methimazole',
    })).toBe('split')
  })

  it('stays shared when the divergent text is a small share of the page', () => {
    expect(speciesMode({
      sp: 'Dog + Cat',
      signs: 'PU/PD, weight loss, poor appetite, vomiting, lethargy, dehydration, pallor and poor body condition on examination',
      conf: 'Serum creatinine and SDMA with concurrently assessed urine specific gravity; stage once stable and well hydrated',
      tx2: 'Cat: Amlodipine 0.625 mg/cat PO SID',
    })).toBe('shared')
  })

  // The real rows behind the calibration — these are what the reader sees, and
  // a synthetic fixture can't tell you whether the bar is set in the right place.
  it('matches the intended mode on the pages that set the bar', () => {
    const mode = (id: string) => speciesMode(DB.disease_page.find(d => d.id === id)!)
    // Genuinely a different disease per species, and authored that way.
    expect(mode('DIS-NEO-INSULINOMA')).toBe('split')
    expect(mode('DIS-NEO-ORAL-SCC')).toBe('split')
    // One shared workup with a few species-specific lines — those still render,
    // they just don't justify making the reader choose first.
    expect(mode('DIS-SEC-CKD')).toBe('shared')
    expect(mode('DIS-GI-EOGAST')).toBe('shared')
    // Paracetamol reads as a textbook species difference, but its sections are
    // authored "esp. dogs" / "esp. cats" — a difference of RATE, not of kind.
    // Both species get both syndromes, so filtering would hide a real
    // presentation; shared mode shows everything, labelled.
    expect(mode('DIS-TOX-APAP')).toBe('shared')
  })

  it('does not split on signalment alone', () => {
    // Different breeds per species is the norm and is not, by itself, a reason
    // to make the reader pick a species.
    expect(speciesMode({ sp: 'Dog + Cat', breed: 'Dog: Boxer|Cat: Siamese', signs: 'PU/PD' }))
      .toBe('shared')
  })

  it('splits a rare-in-other-species page once that species has content', () => {
    expect(speciesMode({
      sp: 'Dog (rarely Cat)',
      signs: 'Dog: Collapse|Cat: Seizures',
      prog: 'Dog: Guarded|Cat: Too few cases',
    })).toBe('split')
  })
})
