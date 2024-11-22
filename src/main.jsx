import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TonWeb from 'tonweb'

// Polyfill global variables
import { Buffer } from 'buffer'
window.Buffer = Buffer
window.process = { env: {} }

window.TonWeb = TonWeb

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

