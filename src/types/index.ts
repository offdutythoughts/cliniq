export interface Lesion {
  id: string
  loc: string
  loc_name: string
  sp: string
  cat: string
  sub: string
  urg: string
  signs: string
  proto?: string
  filter?: string
  note: string
  etiology?: string
  patho?: string
  diag?: string
  treat?: string
  dis?: string
  directDis?: boolean
  noDiffFlow?: boolean
  ddx?: string
}

export interface Differential {
  id: string
  filter: string
  loc: string
  sp: string
  order: number
  name: string
  feat: string
  minDx: string
  addDx: string
  dis?: string
}

export interface Disease {
  id: string
  name: string
  sp: string
  category?: string
  synonyms?: string
  breed?: string
  age?: string
  sex?: string
  path?: string
  signs?: string
  severe?: string
  conf?: string
  supp?: string
  tx1?: string
  tx2?: string
  monitor?: string
  prog?: string
  pearl?: string
  etiology?: string
  patho?: string
  diag?: string
  treat?: string
  ddx?: string
  [key: string]: string | boolean | undefined
}

export interface ProtocolStep {
  n: number
  action: string
  note?: string
  branch?: string
  flag?: string
}

export interface Protocol {
  id: string
  name: string
  sp: string
  trigger: string
  priority: string
  steps: ProtocolStep[]
}

export interface BodySystem {
  id: string
  label: string
  locs: string[]
}

export type Tab = 0 | 1 | 2 | 3 | 4 | 5

export interface PageDescriptor {
  view: string
  params?: Record<string, unknown>
}

export interface HistoryEntry {
  page: PageDescriptor
  title: string
}
