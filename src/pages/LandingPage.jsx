import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { ChevronRight, Lock, QrCode, Bell, Github, Twitter, Linkedin } from 'lucide-react'
import Navbar from '../components/Navbar'

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/verify')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main>
        <section className="container mx-auto px-4 py-28 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400"
          >
            The Future of Document Verification
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            DigiFy is a decentralized platform for secure and immutable document verification, built on the TON blockchain.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-x-4"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="text-black" size="lg" variant="outline">
                  Learn More
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>About DocuTON</DialogTitle>
                </DialogHeader>
                <p>DocuTON is a cutting-edge decentralized platform that leverages the power of the TON blockchain to provide secure and immutable document verification. Our system uses advanced cryptographic techniques to ensure the authenticity and integrity of your important documents.</p>
              </DialogContent>
            </Dialog>
          </motion.div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Decentralized Authentication", icon: <Lock className="w-6 h-6" />, description: "Store cryptographic hashes of documents on the TON blockchain to ensure immutability and authenticity." },
              { title: "Secure Metadata Storage", icon: <ChevronRight className="w-6 h-6" />, description: "Encrypt and store optional metadata on-chain for private verification." },
              { title: "QR Code Verification", icon: <QrCode className="w-6 h-6" />, description: "Generate QR codes linked to document hashes for instant verification." },
              { title: "Real-Time Notifications", icon: <Bell className="w-6 h-6" />, description: "Receive notifications when document hashes are queried or verified." },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 p-2 bg-primary rounded-full">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Stay Updated</h2>
          <div className="max-w-md mx-auto">
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-gray-800 border-gray-700 text-white" />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">DocuTON</h3>
              <p className="text-gray-400">Secure, decentralized document verification on the TON blockchain.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-primary">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-primary">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 DocuTON. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

