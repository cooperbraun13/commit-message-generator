import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './ui/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { Docs } from './pages/Docs'
import { Examples } from './pages/Examples'
import './ui/styles.css'

const router = createBrowserRouter([
  { path: '/', element: <App><Home /></App> },
  { path: '/docs', element: <App><Docs /></App> },
  { path: '/examples', element: <App><Examples /></App> },
])

const container = document.getElementById('root') as HTMLElement
createRoot(container).render(<RouterProvider router={router} />)


