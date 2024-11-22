import TonWeb from 'tonweb';
import QRCode from 'qrcode';

const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));

const CONTRACT_ADDRESS = 'EQCZ0v66LSJAZuHYE4p_ppjCQRZqyjFPCuBj33D0IC8eQz1_';

export const connectWallet = async () => {
  // This is a placeholder. You'll need to implement actual wallet connection logic
  // using TonConnect or another method compatible with your setup.
  console.warn('Wallet connection not implemented');
  return null;
};

export const createEvent = async (name, date, ticketPrice, maxTickets) => {
  try {
    // This is a placeholder. You'll need to implement the actual method call
    // based on your smart contract's structure
    const cell = new TonWeb.boc.Cell();
    cell.bits.writeString('create_event');
    cell.bits.writeString(name);
    cell.bits.writeUint(date, 64);
    cell.bits.writeCoins(TonWeb.utils.toNano(ticketPrice));
    cell.bits.writeUint(maxTickets, 32);

    const result = await tonweb.sendBoc(cell.toBoc());
    return result;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const createTicket = async (eventId, ticketData) => {
  try {
    const cell = new TonWeb.boc.Cell();
    cell.bits.writeUint(eventId, 32);
    cell.bits.writeString(JSON.stringify(ticketData));

    const result = await tonweb.call(CONTRACT_ADDRESS, 'create_ticket', cell.toBoc());
    const ticketId = result.toNumber();

    // Generate QR code
    const qrCodeData = await QRCode.toDataURL(JSON.stringify({ ticketId, eventId }));

    return { ticketId, qrCodeData };
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export const buyTicket = async (eventId) => {
  try {
    // This is a placeholder. You'll need to implement the actual method call
    // based on your smart contract's structure
    const cell = new TonWeb.boc.Cell();
    cell.bits.writeString('buy_ticket');
    cell.bits.writeUint(eventId, 32);

    const result = await tonweb.sendBoc(cell.toBoc());
    return result;
  } catch (error) {
    console.error('Error buying ticket:', error);
    throw error;
  }
};

export const verifyTicket = async (ticketId, userAddress) => {
  try {
    // This is a placeholder. You'll need to implement the actual method call
    // based on your smart contract's structure
    const cell = new TonWeb.boc.Cell();
    cell.bits.writeString('verify_ticket');
    cell.bits.writeUint(ticketId, 32);
    cell.bits.writeAddress(userAddress);

    const result = await tonweb.call(CONTRACT_ADDRESS, 'verify_ticket', cell.toBoc());
    return result;
  } catch (error) {
    console.error('Error verifying ticket:', error);
    throw error;
  }
};

export const getActiveEvents = async () => {
  try {
    // This is a placeholder. You'll need to implement the actual method call
    // based on your smart contract's structure
    const result = await tonweb.call(CONTRACT_ADDRESS, 'get_active_events');
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

