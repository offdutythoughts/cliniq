// ── Direct sign → disease map ─────────────────────────────────────────────────
// Diseases for signs that don't have a full flowchart but are clinically useful
// in Mix & Match. Each entry provides a category string that flows through
// the same normCat() normalisation used by the LOC-based index.

export interface DirectDiseaseEntry {
  diseaseId: string
  cat: string
}

export const DIRECT_SIGN_DISEASES: Record<string, DirectDiseaseEntry[]> = {
  hypotension: [
    { diseaseId: 'DIS-BD-ENV',        cat: 'Toxic' },
    { diseaseId: 'DIS-BD-TCP',        cat: 'Immune-mediated' },
    { diseaseId: 'DIS-ENDO-HYPOTHY',  cat: 'Endocrine' },
    { diseaseId: 'DIS-ENDO-PHEO',     cat: 'Endocrine' },
    { diseaseId: 'DIS-ENV-HEAT',      cat: 'Metabolic' },
    { diseaseId: 'DIS-GI-PARVO',      cat: 'Infectious' },
    { diseaseId: 'DIS-GI-SEPTPERIT',  cat: 'Inflammatory' },
    { diseaseId: 'DIS-NEU-HEADTRAUMA',cat: 'Structural' },
    { diseaseId: 'DIS-NEU-SPFX',      cat: 'Structural' },
    { diseaseId: 'DIS-SEC-AKI',       cat: 'Metabolic' },
    { diseaseId: 'DIS-SEC-HYPO',      cat: 'Endocrine' },
  ],
  hypothermia: [
    { diseaseId: 'DIS-BD-CRGV',           cat: 'Vascular' },
    { diseaseId: 'DIS-BD-TCP',            cat: 'Immune-mediated' },
    { diseaseId: 'DIS-CARD-ATE',          cat: 'Vascular' },
    { diseaseId: 'DIS-ENDO-HYPOTHY',      cat: 'Endocrine' },
    { diseaseId: 'DIS-ENDO-HYPOTHY-CAT',  cat: 'Endocrine' },
    { diseaseId: 'DIS-ENV-BURN',          cat: 'Structural' },
    { diseaseId: 'DIS-ENV-HEAT',          cat: 'Metabolic' },
    { diseaseId: 'DIS-GI-PARVO',          cat: 'Infectious' },
    { diseaseId: 'DIS-HCM',              cat: 'Vascular' },
    { diseaseId: 'DIS-INFECT-CYTAUX',    cat: 'Infectious' },
    { diseaseId: 'DIS-MET-HYPOGLY',      cat: 'Metabolic' },
    { diseaseId: 'DIS-NEU-HYPOMYEL',     cat: 'Neuromuscular' },
    { diseaseId: 'DIS-PYOTHORAX',        cat: 'Infectious' },
    { diseaseId: 'DIS-SEC-HYPO',         cat: 'Endocrine' },
    { diseaseId: 'DIS-TOX-APAP',         cat: 'Toxic' },
  ],
}
