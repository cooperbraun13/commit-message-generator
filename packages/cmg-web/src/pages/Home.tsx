import React from 'react'

export function Home() {
  return (
    <>
      <section className="hero container">
        <div className="glow" aria-hidden="true"></div>
        <h1>
          Generate <span className="gradient">Conventional Commits</span> effortlessly
        </h1>
        <p className="lede">A sleek, offline tool that turns your staged git diffs into clean, conventional commit messages.</p>
        <div className="cta">
          <a className="btn btn-primary" href="#install">Get Started</a>
          <a className="btn btn-ghost" href="/docs">Docs</a>
        </div>
      </section>

      <main className="container">
        <section className="section">
          <div className="card repo">
            <div className="repo-head">
              <h2>Open-source on GitHub</h2>
              <a className="btn btn-ghost" href="https://github.com/cooperbraun13/commit-message-generator" target="_blank" rel="noreferrer">View Repo</a>
            </div>
            <p className="muted">Star or fork to follow development and contribute.</p>
            <div className="badges">
              <a className="github-button" href="https://github.com/cooperbraun13/commit-message-generator" data-size="large" data-show-count="true" aria-label="Star repo">Star</a>
              <a className="github-button" href="https://github.com/cooperbraun13/commit-message-generator/fork" data-size="large" data-show-count="true" aria-label="Fork repo">Fork</a>
            </div>
          </div>
        </section>

        <section id="install" className="section grid">
          <div className="card">
            <h2>Install</h2>
            <ol>
              <li><code>npm install -D cmg-cli</code></li>
              <li>Stage your changes: <code>git add .</code></li>
              <li>Run <code>npx cmggen commit</code></li>
            </ol>
          </div>

          <div id="cli" className="card">
            <h2>CLI commands</h2>
            <ul>
              <li><code>npm exec --workspace packages/cmg-cli cmggen commit</code> — interactive flow, then commits</li>
              <li><code>npm exec --workspace packages/cmg-cli cmggen print</code> — prints a suggested message</li>
            </ul>
          </div>

          <div className="card">
            <h2>Why CMG</h2>
            <ul>
              <li>Offline · Private · Secure</li>
              <li>Smart type & scope inference</li>
              <li>Clean, conventional outputs</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="card code">
            <div className="code-head">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="title">example.commit</span>
            </div>
            <pre>
{`feat(core): add diff parser

Introduce parseGitNumstat() to read staged changes.

BREAKING CHANGE: replaces legacy diff parser`}
            </pre>
          </div>
        </section>

        <section className="section callout">
          <div className="callout-inner">
            <h3>Generate clean commits now</h3>
            <p>Run the CLI in your repo with staged changes.</p>
            <pre className="inline-code">npx cmggen commit</pre>
          </div>
        </section>
      </main>
    </>
  )
}


