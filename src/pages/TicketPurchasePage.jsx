import React, { useState, useEffect } from 'react'
import EventCard from '../components/EventCard'
import { getActiveEvents, buyTicket } from '../utils/ton-integration'

const TicketPurchasePage = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const activeEvents = await getActiveEvents()
      setEvents(Array.isArray(activeEvents) ? activeEvents : [])
    } catch (err) {
      setError('Failed to fetch events. Please try again.')
      console.error('Error fetching events:', err)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const handleEventSelect = (event) => {
    setSelectedEvent(event)
  }

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value) || 1)
  }

  const handlePurchase = async () => {
    if (!selectedEvent) return

    try {
      setLoading(true)
      await buyTicket(selectedEvent.id)
      alert(`Successfully purchased ${quantity} ticket(s) for ${selectedEvent.name}`)
      fetchEvents() // Refresh the event list
    } catch (err) {
      setError('Failed to purchase ticket. Please try again.')
      console.error('Error purchasing ticket:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Purchase Tickets</h1>
      
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {events.length === 0 && !loading && (
        <p className="text-center">No active events available at the moment.</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onClick={() => handleEventSelect(event)}
            selected={selectedEvent?.id === event.id}
          />
        ))}
      </div>

      {selectedEvent && (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Purchase Tickets for {selectedEvent.name}</h2>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={selectedEvent.maxTickets - selectedEvent.ticketsSold}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <p className="mb-4">Total: {quantity * selectedEvent.ticketPrice} TON</p>
          <button 
            onClick={handlePurchase} 
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-500"
          >
            {loading ? 'Processing...' : 'Purchase Tickets'}
          </button>
        </div>
      )}
    </div>
  )
}

export default TicketPurchasePage

