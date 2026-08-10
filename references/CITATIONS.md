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

---

## Second-hand — recorded in the notes files, source PDF no longer on disk

Bibliographic data below was transcribed from the books when the notes were written. It is
good enough to cite, but nobody has re-checked it against a title page since.

**`ettinger9.pdf` is gone and is not being replaced** (decision, 2026-08-10). Do not ask for
it — `ettinger9-notes.md` is the reference of record for that book.

### Ettinger's Textbook of Veterinary Internal Medicine (`ettinger9-notes.md`)

> Ettinger SJ, Feldman EC, Côté E, eds. *Ettinger's Textbook of Veterinary Internal Medicine: Diseases of the Dog and the Cat*. 9th ed. Elsevier; 2024.

2 volumes. Source: header of `ettinger9-notes.md`. The PDF it cites (2,801 pp, formerly in
`~/Downloads/`) is **not on this machine**. The notes' inline `(Ch NN)` shorthand is stable
across printings and needs no page numbers.

### VETgirl / ASPCA APCC toxicology ebook

> ASPCA Animal Poison Control Center. *The Ultimate Guide to Toxicology*. VETgirl; 2023.

A 44-page password-protected FlippingBook, not a formally published monograph — treat as a
corporate-author online document and add an access date and URL if it is ever cited
externally. Author attribution is provisional.

---

## Using citations inside app data

`src/data/db.ts` has no citation field; the three entries that source anything do it inline
in prose (`(Ettinger Ch 121)`). If citations need to surface in the UI, that shorthand is the
existing convention — keep using it for now, and reserve the full AMA strings above for
external or printed output. Adding a structured `refs` field to the entry type would be the
clean fix, but it is a schema change and hasn't been requested.
