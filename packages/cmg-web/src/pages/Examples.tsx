import React from 'react'

export function Examples() {
  return (
    <div className="container section">
      <div className="card code">
        <div className="code-head">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="title">feat.commit</span>
        </div>
        <pre>
{`feat(cli): add interactive commit generator

Prompts for type, scope, subject, body, and breaking changes.
`}
        </pre>
      </div>

      <div className="card code" style={{ marginTop: 16 }}>
        <div className="code-head">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="title">fix.commit</span>
        </div>
        <pre>
{`fix(core): handle null token in parser

Guard against undefined diffs to prevent runtime errors.
`}
        </pre>
      </div>

      <div className="card code" style={{ marginTop: 16 }}>
        <div className="code-head">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="title">multi.commit</span>
        </div>
        <pre>
{`feat(core): improve classification

Enhance scope inference to select dominant scope or list top scopes.

BREAKING CHANGE: removed legacy scope heuristic.
`}
        </pre>
      </div>
    </div>
  )
}


