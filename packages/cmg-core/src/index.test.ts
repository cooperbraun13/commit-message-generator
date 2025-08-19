import { describe, it, expect } from 'vitest'
import { buildConventionalMessage, parseGitNumstat, buildSuggestedMessageFromDiff, classifyChangeTypes, inferScopeFromPathList } from './index'

describe('buildConventionalMessage', () => {
  it('builds a basic header', () => {
    const msg = buildConventionalMessage({ type: 'feat', subject: 'add login' })
    expect(msg).toBe('feat: add login')
  })

  it('includes scope and body and breaking', () => {
    const msg = buildConventionalMessage({
      type: 'fix',
      scope: 'auth',
      subject: 'handle null token',
      body: 'Fixes an edge case when token is missing.',
      breaking: 'Token format changed'
    })
    expect(msg).toContain('fix(auth): handle null token')
    expect(msg).toContain('Fixes an edge case')
    expect(msg).toContain('BREAKING CHANGE: Token format changed')
  })
})

describe('parseGitNumstat', () => {
  it('parses files and counts', () => {
    const raw = '10\t2\tpackages/cmg-core/src/index.ts' + '\n' + '0\t1\tREADME.md\n'
    const info = parseGitNumstat(raw)
    expect(info.filesChanged.length).toBe(2)
    expect(info.filesChanged[0].path).toBe('packages/cmg-core/src/index.ts')
  })
})

describe('classification', () => {
  it('detects docs', () => {
    expect(classifyChangeTypes(['docs/guide.md'])).toBe('docs')
  })
  it('detects tests', () => {
    expect(classifyChangeTypes(['pkg/foo.test.ts'])).toBe('test')
  })
  it('defaults to feat', () => {
    expect(classifyChangeTypes(['src/new-module.ts'])).toBe('feat')
  })
})

describe('scope', () => {
  it('infers package name', () => {
    expect(inferScopeFromPathList(['packages/cmg-core/src/index.ts'])).toBe('cmg-core')
  })
})

describe('suggestion', () => {
  it('builds a suggestion object', () => {
    const diff = parseGitNumstat('1\t0\tpackages/cmg-cli/src/index.ts\n')
    const s = buildSuggestedMessageFromDiff(diff)
    expect(s.type).toBeDefined()
    expect(s.suggestedSubject.length).toBeGreaterThan(0)
  })
})


