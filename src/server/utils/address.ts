import converter from 'bech32-converting';
import { Buffer } from 'buffer';

export const enum AddressType {
  Hex = 0,
  Bech32 = 1
}

export function convertAddressToHex(address: string): string {
  const isBech32 = address.startsWith('wq1');

  return isBech32 ? converter('wq').toHex(address) : address;
}

export function parseBufferedAddress(address: Buffer) {
  if (!address) {
    return null;
  }

  const hex = '0x' + address.toString('hex');
  const bech32 = converter('wq').toBech32(hex);

  return { hex, bech32 };
}

export function parseBufferedHash(hash: Buffer) {
  if (!hash) {
    return null;
  }

  const hex = '0x' + hash.toString('hex');

  return hex;
}

export function convertHashToBuffer(address: string): Buffer {
  const isBech32 = address.startsWith('wq1');

  const hexAddress = isBech32 ? converter('wq').toHex(address) : address;

  const processedHexAddress = hexAddress.startsWith('0x') ?
    hexAddress.slice(2).toUpperCase() :
    hexAddress.toUpperCase();

  return Buffer.from(processedHexAddress, 'hex');
}
