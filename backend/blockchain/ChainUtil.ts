import { ec as EC } from 'elliptic'
import { v1 as uuidV1 } from 'uuid'
import { SHA256 } from 'crypto-js'

const ec = new EC('secp256k1')
export function genKeyPair(): EC.KeyPair {
  return ec.genKeyPair()
}

export function id(): string {
  return uuidV1()
}

export function hash(data: any) {
  return SHA256(JSON.stringify(data)).toString()
}

export function verifySignature(
  publicKey: string,
  signature: string,
  dataHash: string
): boolean {
  return ec
    .keyFromPublic(publicKey, 'hex')
    .verify(dataHash, signature)
}
