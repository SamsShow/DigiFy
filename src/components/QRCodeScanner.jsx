import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Aperture } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { verifyTicket } from '../utils/ton-integration';

const QRCodeScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (scanning) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [scanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Simulate QR code processing
      const simulatedTicketId = Math.floor(Math.random() * 1000000);
      verifyTicket(simulatedTicketId, 'SIMULATED_USER_ADDRESS')
        .then(isValid => {
          setResult({
            valid: isValid,
            message: isValid ? 'Ticket is valid' : 'Ticket is invalid',
          });
        })
        .catch(error => {
          console.error('Error verifying ticket:', error);
          setResult({
            valid: false,
            message: 'Error verifying ticket',
          });
        });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-6 h-6" />
          Scan Ticket QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video 
            ref={videoRef} 
            className="w-full h-full object-cover"
            playsInline
          />
          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-white rounded-lg"></div>
            </div>
          )}
        </div>
        <div className="flex justify-between gap-4">
          <Button
            onClick={() => setScanning(prev => !prev)}
            className="flex-1 bg-primary text-primary-foreground"
          >
            {scanning ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Stop Camera
              </>
            ) : (
              <>
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </>
            )}
          </Button>
          {scanning && (
            <Button
              onClick={captureImage}
              className="flex-1 bg-secondary text-secondary-foreground"
            >
              <Aperture className="w-4 h-4 mr-2" />
              Capture
            </Button>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
        {result && (
          <div className={`p-4 rounded-md ${result.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-semibold">{result.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRCodeScanner;

