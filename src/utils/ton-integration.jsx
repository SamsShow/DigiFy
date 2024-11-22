import TonConnect from '@tonconnect/sdk';
import TonWeb from 'tonweb';
import QRCode from 'qrcode';

const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));

const CONTRACT_ADDRESS = 'EQCZ0v66LSJAZuHYE4p_ppjCQRZqyjFPCuBj33D0IC8eQz1_';

// Initialize TonConnect
const tonConnectOptions = {
  manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json',
};
const tonConnect = new TonConnect(tonConnectOptions);

export const connectWallet = async () => {
  try {
    // Check if wallet is already connected
    if (tonConnect.connected) {
      return tonConnect.wallet;
    }

    // If not connected, initiate connection
    const walletConnectionSource = {
      universalLink: 'https://app.tonkeeper.com/ton-connect',
      bridgeUrl: 'https://bridge.tonapi.io/bridge',
    };

    await tonConnect.connect(walletConnectionSource);

    // Wait for the connection to be established
    return new Promise((resolve) => {
      const unsubscribe = tonConnect.onStatusChange((wallet) => {
        if (wallet) {
          unsubscribe();
          resolve(wallet);
        }
      });
    });
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw error;
  }
};

export const createEvent = async (name, date, ticketPrice, maxTickets) => {
  try {
    if (!tonConnect.connected) {
      throw new Error('Wallet not connected');
    }

    const contract = new TonWeb.Contract(tonweb.provider, {
      address: CONTRACT_ADDRESS,
      abi: {
        'ABI version': 2,
        functions: [{ name: 'createEvent', inputs: [{ name: 'name', type: 'string' }, { name: 'date', type: 'uint256' }, { name: 'ticketPrice', type: 'uint128' }, { name: 'maxTickets', type: 'uint32' }] }]
      }
    });

    const payload = await contract.createEvent(name, date, TonWeb.utils.toNano(ticketPrice), maxTickets).getPayload();

    const result = await tonConnect.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
      messages: [
        {
          address: CONTRACT_ADDRESS,
          amount: TonWeb.utils.toNano('0.05'),
          payload,
        },
      ],
    });

    return result;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const createTicket = async (eventId, ticketData) => {
  try {
    if (!tonConnect.connected) {
      throw new Error('Wallet not connected');
    }

    const contract = new TonWeb.Contract(tonweb.provider, {
      address: CONTRACT_ADDRESS,
      abi: {
        'ABI version': 2,
        functions: [{ name: 'buyTicket', inputs: [{ name: 'eventId', type: 'uint32' }] }]
      }
    });

    const payload = await contract.buyTicket(eventId).getPayload();

    const result = await tonConnect.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from now
      messages: [
        {
          address: CONTRACT_ADDRESS,
          amount: TonWeb.utils.toNano('0.05'),
          payload,
        },
      ],
    });

    // Generate QR code
    const qrCodeData = await QRCode.toDataURL(JSON.stringify({ eventId, ticketData }));

    return { result, qrCodeData };
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export const buyTicket = createTicket; // Alias for createTicket function

export const verifyTicket = async (ticketId, userAddress) => {
  try {
    const contract = new TonWeb.Contract(tonweb.provider, {
      address: CONTRACT_ADDRESS,
      abi: {
        'ABI version': 2,
        functions: [{ name: 'verifyTicket', inputs: [{ name: 'ticketId', type: 'uint32' }, { name: 'userAddress', type: 'address' }] }]
      }
    });

    const result = await contract.methods.verifyTicket(ticketId, userAddress).call();
    return result;
  } catch (error) {
    console.error('Error verifying ticket:', error);
    throw error;
  }
};

export const getActiveEvents = async () => {
  try {
    const contract = new TonWeb.Contract(tonweb.provider, {
      address: CONTRACT_ADDRESS,
      abi: {
        'ABI version': 2,
        functions: [{ name: 'getActiveEvents', inputs: [] }]
      }
    });

    const result = await contract.methods.getActiveEvents().call();
    return result;
  } catch (error) {
    console.error('Error getting active events:', error);
    throw error;
  }
};

// Helper function to convert TON to nanoTON
export const toNano = (amount) => {
  return TonWeb.utils.toNano(amount);
};

// Helper function to convert nanoTON to TON
export const fromNano = (amount) => {
  return TonWeb.utils.fromNano(amount);
};

