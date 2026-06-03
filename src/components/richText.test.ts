import { describe, it, expect } from 'vitest'
import { createElement, Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { richTextToNodes } from './RichText'
import { parseLegacyOnclick, screenMeta } from '../app/nav/view'
import type { View } from '../app/nav/view'

const render = (s: string, onNav?: (v: View) => void) =>
  renderToStaticMarkup(createElement(Fragment, null, richTextToNodes(s, onNav)))

describe('RichText allowlist parser', () => {
  it('renders inert formatting tags as real elements', () => {
    const out = render('<strong>A</strong><br><em>b</em>')
    expect(out).toContain('<strong>A</strong>')
    expect(out).toContain('<br/>')
    expect(out).toContain('<em>b</em>')
  })

  it('maps class -> className (app classes preserved)', () => {
    expect(render('<div class="dx-test">x</div>')).toContain('class="dx-test"')
  })

  it('parses inline style and preserves CSS variables verbatim', () => {
    const out = render('<div style="font-size:10px;color:var(--white)">x</div>')
    expect(out).toContain('font-size:10px')
    expect(out).toContain('color:var(--white)')
  })

  it('keeps table markup including colspan', () => {
    const out = render('<table><tbody><tr><th colspan="2">H</th></tr></tbody></table>')
    expect(out).toContain('<table>')
    expect(out).toMatch(/colspan="2"/i) // React prop casing; browser-identical
  })

  it('drops a disallowed tag but keeps its text (no href/script ever)', () => {
    const out = render('<a href="javascript:alert(1)">click</a><b>ok</b>')
    expect(out).not.toContain('<a')
    expect(out).not.toContain('href')
    expect(out).toContain('click')
    expect(out).toContain('<b>ok</b>')
  })

  it('never emits a live onclick attribute (navigation is React-only)', () => {
    const out = render(`<div onclick="renderDiseasePage('DIS-X')">go</div>`, () => {})
    expect(out).not.toContain('onclick')
    expect(out).toContain('go')
    expect(out).toContain('role="button"') // wired as an interactive React element
  })
})

describe('parseLegacyOnclick', () => {
  it('maps known nav functions to Views', () => {
    expect(parseLegacyOnclick(`renderDiseasePage('DIS-X')`)).toEqual({ kind: 'disease', id: 'DIS-X' })
    expect(parseLegacyOnclick(`renderProtoDetail('PROT-CPR')`)).toEqual({ kind: 'protocol', id: 'PROT-CPR' })
    expect(parseLegacyOnclick(`renderDxId('coughing','dx')`)).toEqual({ kind: 'dx', sign: 'coughing', tab: 'dx' })
    expect(parseLegacyOnclick(`renderDxId('coughing')`)).toEqual({ kind: 'dx', sign: 'coughing', tab: 'history' })
    expect(parseLegacyOnclick(`goLesionTab('LOC-X','Hepatic')`)).toEqual({ kind: 'lesionLoc', loc: 'LOC-X', name: 'Hepatic' })
  })

  it('returns null for the known-broken legacy flow links', () => {
    expect(parseLegacyOnclick(`renderRestFlow('x')`)).toBeNull()
    expect(parseLegacyOnclick(`renderExpFlow('x')`)).toBeNull()
  })
})

describe('screenMeta — legacy note-key/title parity', () => {
  it('reproduces the legacy note-key scheme', () => {
    expect(screenMeta({ kind: 'flow', flowId: 'dyspnoea' }).noteKey).toBe('flow:dyspnoea')
    expect(screenMeta({ kind: 'dx', sign: 'pupd', tab: 'dx' }).noteKey).toBe('page:dxPUPDDx')
    expect(screenMeta({ kind: 'dx', sign: 'coughing', tab: 'history' }).noteKey).toBe('page:dxCoughingHistory')
    expect(screenMeta({ kind: 'disease', id: 'DIS-HCM' }).noteKey).toBe('disease:DIS-HCM')
    expect(screenMeta({ kind: 'protocol', id: 'PROT-CPR' }).noteKey).toBe('proto:PROT-CPR')
    expect(screenMeta({ kind: 'lesionLoc', loc: 'LOC-X', name: 'N' }).noteKey).toBe('loc:LOC-X')
    expect(screenMeta({ kind: 'tab', tab: 0 }).noteTitle).toBe('Clinical — General')
  })

  it('derives titles from data (not empty for known ids)', () => {
    expect(screenMeta({ kind: 'flow', flowId: 'dyspnoea' }).topbarTitle.length).toBeGreaterThan(0)
    expect(screenMeta({ kind: 'disease', id: 'DIS-HCM' }).noteTitle.length).toBeGreaterThan(0)
  })
})
