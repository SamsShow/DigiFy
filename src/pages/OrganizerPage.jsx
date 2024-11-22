import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { createTicket } from '../utils/ton-integration';

const OrganizerPage = () => {
  const [ticketData, setTicketData] = useState({
    eventId: '',
    eventName: '',
    ticketType: '',
    price: '',
  });
  const [createdTicket, setCreatedTicket] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setError('');
    setCreatedTicket(null);

    try {
      const result = await createTicket(parseInt(ticketData.eventId), ticketData);
      setCreatedTicket(result);
    } catch (err) {
      setError('Failed to create ticket. Please try again.');
      console.error('Error creating ticket:', err);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Create Event Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <Label htmlFor="eventId">Event ID</Label>
                  <Input
                    id="eventId"
                    name="eventId"
                    type="number"
                    required
                    value={ticketData.eventId}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input
                    id="eventName"
                    name="eventName"
                    type="text"
                    required
                    value={ticketData.eventName}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="ticketType">Ticket Type</Label>
                  <Input
                    id="ticketType"
                    name="ticketType"
                    type="text"
                    required
                    value={ticketData.ticketType}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (TON)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    value={ticketData.price}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-white"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Create Ticket
                </Button>
              </form>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {createdTicket && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <Alert variant="default" className="bg-green-900/20 border-green-900">
                    <AlertTitle>Ticket Created Successfully</AlertTitle>
                    <AlertDescription>
                      <p>Ticket ID: {createdTicket.ticketId}</p>
                      <div className="mt-4">
                        <p className="mb-2">QR Code:</p>
                        <img src={createdTicket.qrCodeData} alt="Ticket QR Code" className="mx-auto" />
                      </div>
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganizerPage;

