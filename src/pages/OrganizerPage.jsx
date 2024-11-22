import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { createTicket, connectWallet } from '../utils/ton-integration';

const OrganizerPage = () => {
  const [ticketData, setTicketData] = useState({
    eventId: '',
    eventName: '',
    ticketType: '',
    price: '',
  });
  const [createdTicket, setCreatedTicket] = useState(null);
  const [error, setError] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const wallet = await connectWallet();
        setWalletConnected(!!wallet);
      } catch (err) {
        console.error('Error checking wallet connection:', err);
      }
    };

    checkWalletConnection();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData(prev => ({ ...prev, [name]: value }));
  };

  const handleConnectWallet = async () => {
    setConnecting(true);
    setError('');
    try {
      const wallet = await connectWallet();
      if (wallet) {
        setWalletConnected(true);
        setError('');
      }
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      console.error('Error connecting wallet:', err);
    } finally {
      setConnecting(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setError('');
    setCreatedTicket(null);

    if (!walletConnected) {
      setError('Please connect your wallet first.');
      return;
    }

    try {
      const { result, qrCodeData } = await createTicket(parseInt(ticketData.eventId), ticketData);
      setCreatedTicket({ transactionResult: result, qrCodeData });
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
              {!walletConnected && (
                <Button 
                  onClick={handleConnectWallet} 
                  className="w-full mb-4 bg-primary hover:bg-primary/90"
                  disabled={connecting}
                >
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              )}
              {walletConnected && (
                <Alert className="mb-4 bg-green-900/20 border-green-900">
                  <AlertTitle>Wallet Connected</AlertTitle>
                  <AlertDescription>You can now create tickets.</AlertDescription>
                </Alert>
              )}
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
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={!walletConnected}>
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
                      <p>Transaction Result: {JSON.stringify(createdTicket.transactionResult)}</p>
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

