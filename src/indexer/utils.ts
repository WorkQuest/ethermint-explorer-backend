import axios from 'axios';
import { bech32 } from 'bech32';
import BigNumber from 'bignumber.js';

const gweiToWei = 9;

const cli = axios.create({
  baseURL: 'http://localhost:8545'
})

export function hex2dec(hex: string) :number {
  return parseInt(hex, 16)
}

export async function getTXByHash(hash: string){
  return (await cli.post('/', {
    method: 'eth_getTransactionByHash',
    params: [hash],
    jsonrpc: '2.0',
    id: '1'
  }, {
    headers: {
      'content-type': 'application/json'
    }
  })).data.result
}

export function hex2bech(address: string): string {
  let words = bech32.toWords(Buffer.from(address, 'hex'))
  return bech32.encode('eth', words)
}

export function getTxFee(gasUsed: number, gasPrice: string): string {
  return new BigNumber(gasUsed).multipliedBy(new BigNumber(gasPrice)).toString()
}

export function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}
