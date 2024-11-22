import React from 'react';


const EventCard = ({ event, onClick, selected }) => {
    return (
      <div 
        className={`cursor-pointer p-4 rounded-lg ${selected ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 transition-colors`}
        onClick={onClick}
      >
        <h3 className="text-xl font-bold mb-2">{event.name}</h3>
        <p className="mb-2">{new Date(event.date).toLocaleDateString()}</p>
        <p>Price: {event.ticketPrice} TON</p>
        <p>Available: {event.maxTickets - event.ticketsSold}</p>
      </div>
    )
  }
  
  export default EventCard
  
  