import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Calendar } from 'lucide-react'
import { connectWallet, getActiveEvents, buyTicket } from '../utils/ton-integration'

export default function TicketPurchasePage() {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [walletConnected, setWalletConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const activeEvents = await getActiveEvents()
      setEvents(activeEvents)
    } catch (err) {
      setError('Failed to fetch events. Please try again.')
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleConnectWallet = async () => {
    const wallet = await connectWallet()
    if (wallet) {
      setWalletConnected(true)
    }
  }

  const handleEventSelect = (eventId) => {
    const event = events.find(e => e.id === eventId)
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
    } catch (err) {
      setError('Failed to purchase ticket. Please try again.')
      console.error('Error purchasing ticket:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Purchase Tickets</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Available Events</CardTitle>
              <CardDescription>Select an event to purchase tickets</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center">Loading events...</div>
              ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
              ) : (
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upcoming">
                    <div className="grid gap-4 md:grid-cols-2">
                      {events.filter(event => new Date(event.date) > new Date()).map(event => (
                        <Card key={event.id} className={`cursor-pointer transition-all ${selectedEvent?.id === event.id ? 'border-primary' : ''}`} onClick={() => handleEventSelect(event.id)}>
                          <CardHeader>
                            <CardTitle>{event.name}</CardTitle>
                            <CardDescription>
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Price: {event.ticketPrice} TON</p>
                            <p>Available: {event.maxTickets - event.ticketsSold}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="past">
                    <div className="grid gap-4 md:grid-cols-2">
                      {events.filter(event => new Date(event.date) <= new Date()).map(event => (
                        <Card key={event.id} className="opacity-50">
                          <CardHeader>
                            <CardTitle>{event.name}</CardTitle>
                            <CardDescription>
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Price: {event.ticketPrice} TON</p>
                            <p>Sold: {event.ticketsSold}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>

          {selectedEvent && (
            <Card>
              <CardHeader>
                <CardTitle>Purchase Tickets</CardTitle>
                <CardDescription>Complete your ticket purchase for {selectedEvent.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" value={quantity} onChange={handleQuantityChange} min="1" max={selectedEvent.maxTickets - selectedEvent.ticketsSold} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="total">Total Price</Label>
                    <Input id="total" value={`${quantity * selectedEvent.ticketPrice} TON`} disabled />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>Cancel</Button>
                <Button onClick={handlePurchase} disabled={!walletConnected || loading}>
                  {loading ? 'Processing...' : 'Purchase Tickets'}
                </Button>
              </CardFooter>
            </Card>
          )}

          {!walletConnected && (
            <div className="mt-8 text-center">
              <Button onClick={handleConnectWallet} className="bg-primary hover:bg-primary/90">
                Connect Wallet to Purchase Tickets
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

