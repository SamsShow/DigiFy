import React, { useState } from 'react'
import { verifyTicket } from '../utils/ton-integration'

const DocumentVerification = () => {
  const [ticketId, setTicketId] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)

  const handleVerify = async (e) => {
    e.preventDefault()
    try {
      const result = await verifyTicket(ticketId, userAddress)
      setVerificationResult(result)
    } catch (error) {
      console.error('Verification error:', error)
      setVerificationResult(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Verify Ticket</h2>
      <form onSubmit={handleVerify}>
        <div className="mb-4">
          <label htmlFor="ticketId" className="block mb-2">Ticket ID</label>
          <input
            type="text"
            id="ticketId"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userAddress" className="block mb-2">User Address</label>
          <input
            type="text"
            id="userAddress"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Verify
        </button>
      </form>
      {verificationResult !== null && (
        <div className={`mt-4 p-2 rounded ${verificationResult ? 'bg-green-500' : 'bg-red-500'}`}>
          {verificationResult ? 'Ticket is valid' : 'Ticket is invalid'}
        </div>
      )}
    </div>
  )
}

export default DocumentVerification

