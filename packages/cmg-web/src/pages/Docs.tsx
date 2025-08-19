import React from 'react'

export function Docs() {
  return (
    <div className="container section">
      <div className="card">
        <h2>Installation</h2>
        <ol>
          <li><code>npm install</code></li>
          <li><code>npm run build</code></li>
          <li>Stage changes: <code>git add .</code></li>
          <li>Run <code>npm exec --workspace packages/cmg-cli cmggen commit</code></li>
        </ol>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>CLI</h2>
        <ul>
          <li><code>npm exec --workspace packages/cmg-cli cmggen commit</code> — interactive flow, commits</li>
          <li><code>npm exec --workspace packages/cmg-cli cmggen print</code> — prints suggested message</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2>Conventional Commits</h2>
        <p>CMG outputs messages like <code>feat(core): add diff parser</code> and supports body and breaking changes.</p>
        <ul>
          <li>Header: <code>type(scope): subject</code></li>
          <li>Body: optional paragraphs</li>
          <li>Breaking: <code>BREAKING CHANGE: ...</code></li>
        </ul>
      </div>
    </div>
  )
}


