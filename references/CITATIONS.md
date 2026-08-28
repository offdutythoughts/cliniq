# Reference citations — AMA 11th edition

Canonical citation strings for every clinical reference in this project. Cite from this
file rather than composing a citation from memory or from a filename.

**AMA book format:** `Author AA, Author BB, eds. *Title of Book*. 3rd ed. Publisher; Year.`
**AMA book chapter:** `Author AA. Title of chapter. In: Editor AA, ed. *Title of Book*. 3rd ed. Publisher; Year:pp-pp.`

AMA 11th ed. drops the publisher's city — use `Elsevier; 2025.`, not `St. Louis, MO: Elsevier; 2025.`
List up to 6 authors; with 7 or more, give the first 3 then `et al`. Initials take no
periods and no spaces (`Gupta RC`). Edition is omitted for a 1st edition. In text, cite
with a superscript arabic numeral in order of first appearance.

---

## Verified — bibliographic data read off the book's own copyright page

### Veterinary Toxicology (`vettox3.*`)

> Gupta RC, ed. *Veterinary Toxicology: Basic and Clinical Principles*. 3rd ed. Academic Press; 2018.

ISBN 978-0-12-811410-0. Academic Press is an Elsevier imprint; the copyright page carries
both — cite the imprint. Chapter template:

> [Chapter author(s)]. [Chapter title]. In: Gupta RC, ed. *Veterinary Toxicology: Basic and Clinical Principles*. 3rd ed. Academic Press; 2018:[pp-pp].

Chapter authors are listed under each chapter title in `vettox3.md` (see `vettox3-index.md`
for line numbers). **Page ranges are not recoverable from the text conversion** — the
converter dropped page markers. Pull them from `vettox3.pdf` before citing at chapter level.

### Veterinary Dentistry (`vetdent4.*`)

> Lemmons MS. *Veterinary Dentistry: A Team Approach*. 4th ed. Elsevier; 2025.

ISBN 978-0-443-11710-7. Copyright © 2025 Elsevier Inc.

Cited as **author, not editor**: the title page (PDF p5) gives Matthew S. Lemmons alone with
no role label — compare the Gupta title page, which says "Edited by" explicitly. Three people
appear under CONTRIBUTORS (Castejon-Gonzalez, Lemmons, Reiter). No eponym on the title page:
the preface refers to *Holmstrom's Veterinary Dentistry* after original author Steven
Holmstrom, but the copyright page title is plain `VETERINARY DENTISTRY: A TEAM APPROACH`.

### Small Animal Critical Care Medicine (`saccm2.pdf`)

> Silverstein DC, Hopper K, eds. *Small Animal Critical Care Medicine*. 2nd ed. Saunders; 2015.

ISBN 978-1-4557-0306-7. Copyright © 2015, 2009 by Saunders, an Elsevier imprint.

⚠️ **This is the 2nd edition, not the 3rd.** The download filename claimed "Third edition,
2023, isbn13 9780323764698"; the book's own title page reads SECOND EDITION and its copyright
page reads 2015. The file has been renamed `saccm2.pdf` accordingly. A 3rd edition does exist
— this is not it. Treat the content as ten years old, which matters for a critical care text.

The companion file `saccm3-alt.pdf` was a 1-page fragment, not a book — deleted 2026-08-10.

### Veterinary Ophthalmology (`vetoph6.pdf`, `vetoph6-notes.md`)

> Gelatt KN, ed. *Veterinary Ophthalmology*. 6th ed. Wiley Blackwell; 2021.

2 volumes, 2,744 pp. Verified against the title page (PDF p6) and copyright page (p7):
"This edition first published 2021 © 2021 by John Wiley & Sons, Inc."; Wiley‐Blackwell is the
imprint formed after Wiley acquired Blackwell.

Note the title page distinguishes **Editor** Kirk N. Gelatt from five **Associate Editors**
(Ben‐Shlomo, Gilger, Hendrix, Kern, Plummer). `vetoph6-notes.md` lists all six as `eds.`,
which overstates the associates' role — prefer the single-editor form above. Cite associate
editors only if a house style requires the full list.

### Ettinger's Textbook of Veterinary Internal Medicine (`ettinger9.md`, `ettinger9-notes.md`)

> Côté E, Ettinger SJ, Feldman EC, eds. *Ettinger's Textbook of Veterinary Internal Medicine*. 9th ed. Elsevier; 2024.

2 volumes, ~2,320 pp. Two-volume set ISBN 978-0-323-77931-9; Vol 1 978-0-443-10785-6, Vol 2
978-0-443-10786-3. "Copyright © 2024 by Elsevier Inc."; previous editions 2017, 2010, 2005,
2000, 1995, 1989, 1983, 1975.

Promoted from second-hand to verified on 2026-08-15, when the full-text conversion
`references/ettinger9.md` arrived and made the front matter readable again (title page at
lines 53–75, copyright page 77–95). **Two corrections to the string previously carried
here:**

1. **Editor order is Côté, Ettinger, Feldman** — that is the title-page order in the 9th
   edn, where Côté is now lead editor. The old string led with Ettinger. (The photo caption
   on the Editors page, front matter line 103, runs Feldman/Ettinger/Côté; AMA follows the
   title page, so that ordering is not the one to use.)
2. **The 9th edn carries no subtitle.** Its title page and copyright page both read plain
   `ETTINGER'S TEXTBOOK OF VETERINARY INTERNAL MEDICINE`. *Diseases of the Dog and the Cat*
   was the subtitle of earlier editions and survives only inside the book's own citations of
   the 3rd and 7th edns. The old string appended it to the 9th.

Chapter template — 331 chapters, each singly or jointly authored, with the author line
immediately below the title in `ettinger9.md`:

> [Chapter author(s)]. [Chapter title]. In: Côté E, Ettinger SJ, Feldman EC, eds. *Ettinger's Textbook of Veterinary Internal Medicine*. 9th ed. Elsevier; 2024:[pp-pp].

Page ranges *are* recoverable from this conversion, unlike `vettox3.md` — the running-header
lines carry printed page numbers. See `ettinger9-index.md` for the lookup. The inline
`(Ettinger Ch NN)` shorthand used in app data remains chapter-only and needs no pages.

**`ettinger9.pdf` is still gone and is still not being replaced** (decision, 2026-08-10).
The full-text `.md` supersedes the need for it.

---

## Second-hand — recorded in the notes files, source no longer on disk

Bibliographic data below was transcribed when the notes were written. It is good enough to
cite, but nobody has re-checked it against a title page since.

### VETgirl / ASPCA APCC toxicology ebook

> ASPCA Animal Poison Control Center. *The Ultimate Guide to Toxicology*. VETgirl; 2023.

A 44-page password-protected FlippingBook, not a formally published monograph — treat as a
corporate-author online document and add an access date and URL if it is ever cited
externally. Author attribution is provisional.

---

## Using citations inside app data

`src/data/db.ts` has no citation field; entries cite inline in prose instead —
`(Ettinger Ch 121)` for internal medicine, `(Gelatt 6th edn Ch 20)` or
`(Gelatt 6th edn Table 17.3)` for ophthalmology, `(VETgirl 2023 p. 27)` for toxicology.
This is now widespread, not a handful of entries. Ophthalmology is fully attributed as of
2026-08-28: all 26 `DIS-EYE-*` / `DIS-OPH-*` / ocular `DIS-NEU-*` disease pages **and** all 118
ophthalmic lesion rows (`LES-RE-*`, `LES-BL-*`, `LES-WE-*`, `LES-AP-*`) carry a chapter-level
cite. Chapter numbers were read off the `vetoph6.pdf` table of contents (PDF pp. 8–14), not
inferred: 1 embryology · 8.4 mydriatics · 8.5 glaucoma therapy · 14 orbit · 15 eyelid ·
16 nasolacrimal · 17 lacrimal secretory · 18 conjunctiva + nictitans · 19 cornea + sclera ·
20 glaucoma · 21 anterior uvea · 22 lens + cataract · 25 ocular fundus · 27 optic nerve ·
28 feline · 36 neuro-ophthalmology.

Note the routing exception: the cortical/forebrain blindness rows (`LES-BL-CX-*`) are internal
medicine, not ophthalmology, and cite Ettinger (or Gupta for the toxicoses) per the CLAUDE.md
source-routing rule — Gelatt Ch 36 covers central blindness and dysautonomia but not hepatic
encephalopathy, hypoglycaemia or toxicoses. `(Gupta 3rd edn Ch NN)` is a new shorthand
introduced for that one row; it follows the same pattern as the others.

Non-ophthalmic areas of `db.ts` have not been audited to this standard.

If citations need to surface in the UI, that shorthand is the existing convention — keep using
it for now, and reserve the full AMA strings above for external or printed output. Adding a
structured `refs` field to the entry type would be the clean fix, but it is a schema change
and hasn't been requested.
