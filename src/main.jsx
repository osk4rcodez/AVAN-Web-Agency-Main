import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import { MotionProvider, useMotionPreference } from './lib/motion-preference.jsx'
import '@avenra/liquid-glass/styles'
import './index.css'

// Liest die kombinierte Praeferenz (manueller Toggle > Systemeinstellung) und
// gibt sie an Framer Motion weiter, damit JEDE motion.*-Komponente auch dem
// manuellen Schalter folgt — nicht nur der reinen prefers-reduced-motion-Abfrage.
function MotionConfigBridge({ children }) {
  const { reduceMotion } = useMotionPreference()
  return <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>{children}</MotionConfig>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionProvider>
      <MotionConfigBridge>
        <App />
      </MotionConfigBridge>
    </MotionProvider>
  </React.StrictMode>,
)
