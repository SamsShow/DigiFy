import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">DigiFy</Link>
        <div>
          <Link to="/verify" className="text-white mr-4">Verify</Link>
          <Link to="/tickets" className="text-white">Tickets</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

