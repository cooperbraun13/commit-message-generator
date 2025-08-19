import React from 'react'

export function App() {
  return (
    <div className="page">
      <nav className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#">CMG</a>
          <div className="nav-actions">
            <a className="link" href="#install">Get Started</a>
            <a className="link" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </nav>

      <header className="hero container">
        <div className="glow" aria-hidden="true"></div>
        <h1>
          Generate <span className="gradient">Conventional Commits</span> effortlessly
        </h1>
        <p className="lede">A sleek, offline tool that turns your staged git diffs into clean, conventional commit messages.</p>
        <div className="cta">
          <a className="btn btn-primary" href="#install">Get Started</a>
          <a className="btn btn-ghost" href="#cli">View CLI</a>
        </div>
      </header>

      <main className="container">
        <section id="install" className="section grid">
          <div className="card">
            <h2>Install</h2>
            <ol>
              <li><code>npm install -D cmg-cli</code></li>
              <li>Stage your changes: <code>git add .</code></li>
              <li>Run <code>npx cmg commit</code></li>
            </ol>
          </div>

          <div id="cli" className="card">
            <h2>CLI commands</h2>
            <ul>
              <li><code>cmg commit</code> — interactive flow, then commits</li>
              <li><code>cmg print</code> — prints a suggested message</li>
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
            <pre className="inline-code">npx cmg commit</pre>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <span>© {new Date().getFullYear()} CMG — Conventional Commits, made simple.</span>
      </footer>
    </div>
  )
}


