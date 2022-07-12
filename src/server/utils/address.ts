import converter from 'bech32-converting';
import { Buffer } from 'buffer';
import { Address } from '../database';

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

export function getEmptyWallet(address: string) {
  const hexAddress = convertAddressToHex(address);

  const wallet = {
    hash: {
      hex: hexAddress,
      bech32: converter('wq').toBech32(address),
    },
    contract_code: null,
    fetched_coin_balance: "0",
    fetched_coin_balance_block_number: "0",
    inserted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    nonce: null,
    decompiled: false,
    verified: false,
    token: null,
    smartContract: null
  }

  return wallet;
}