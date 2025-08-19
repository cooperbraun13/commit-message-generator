import React from 'react'

export function App() {
  return (
    <div className="page">
      <header className="header">
        <h1>Commit Message Generator</h1>
        <p>Generate clean, conventional commits from your staged diffs.</p>
      </header>

      <section className="section grid">
        <div className="card">
          <h2>Install</h2>
          <ol>
            <li>
              <code>npm install -D cmg-cli</code>
            </li>
            <li>Ensure you have staged changes in your git repo</li>
            <li>
              Run <code>npx cmg commit</code> to start the interactive flow
            </li>
          </ol>
        </div>

        <div className="card">
          <h2>CLI commands</h2>
          <ul>
            <li>
              <code>cmg commit</code> — prompts for type, scope, subject, body, breaking and commits
            </li>
            <li>
              <code>cmg print</code> — prints a suggested message without committing
            </li>
          </ul>
        </div>

        <div className="card">
          <h2>What it does</h2>
          <ul>
            <li>Reads staged diff (local only)</li>
            <li>Guesses type (feat, fix, docs, refactor, test, chore)</li>
            <li>Infers scope from folder or package</li>
            <li>Builds Conventional Commit message (sanitized)</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card code">
          <h2>Example commit</h2>
          <pre>
{`feat(core): add diff parser

Introduce parseGitNumstat() to read staged changes.

BREAKING CHANGE: replaces legacy diff parser`}
          </pre>
        </div>
      </section>

      <footer className="footer">
        <span>Offline · Private · Secure</span>
      </footer>
    </div>
  )
}


