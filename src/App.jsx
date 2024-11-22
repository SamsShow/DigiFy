import React from 'react'
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import VerifyPage from './pages/VerifyPage'
import TicketPurchasePage from './pages/TicketPurchasePage'
import Navbar from './components/Navbar'
import OrganizerPage from './pages/OrganizerPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/tickets" element={<TicketPurchasePage />} />
          <Route path="/organize" element={<OrganizerPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

