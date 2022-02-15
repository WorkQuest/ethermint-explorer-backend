import converter from 'bech32-converting';
import { Buffer } from 'buffer';

export function parseBufferedAddress(address: Buffer) {
  if (!address) {
    return null;
  }

  const hex = address.toString('hex');
  const bech32 = converter('wq').toBech32('0x' + hex);

  return { hex, bech32 };
}

export function convertHashToBuffer(address: string): Buffer {
  const processedAddress = address.startsWith('0x') ?
    address.slice(2).toUpperCase() :
    address.toUpperCase();

  return Buffer.from(processedAddress, 'hex');
}
