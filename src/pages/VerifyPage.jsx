import React, { useState } from 'react';
import DocumentVerification from '../components/DocumentVerification';
import QRCodeScanner from '../components/QRCodeScanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { QrCode, FileText } from 'lucide-react';

const VerifyPage = () => {
  const [activeTab, setActiveTab] = useState('qr');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Document Verification</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="qr" className="flex items-center gap-2">
            <QrCode className="w-4 h-4" />
            Scan QR Code
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Manual Entry
          </TabsTrigger>
        </TabsList>
        <TabsContent value="qr">
          <QRCodeScanner />
        </TabsContent>
        <TabsContent value="manual">
          <DocumentVerification />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VerifyPage;

