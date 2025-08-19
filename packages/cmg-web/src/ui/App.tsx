import React from 'react'
import { Link } from 'react-router-dom'

export function App({ children }: { children?: React.ReactNode }) {
  return (
    <div className="page">
      <nav className="nav">
        <div className="container nav-inner">
          <Link className="brand" to="/">CMG</Link>
          <div className="nav-actions">
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="/docs">Docs</Link>
            <Link className="link" to="/examples">Examples</Link>
            <a className="link" href="https://github.com/cooperbraun13/commit-message-generator" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </nav>

      {children}

      <footer className="footer container">
        <span>© {new Date().getFullYear()} CMG — Conventional Commits, made simple.</span>
      </footer>
    </div>
  )
}


