import { DIFFICULTY, MINE_RATE } from '../config'

const SHA256 = require('crypto-js/sha256')
const dayjs = require('dayjs')

export type BookingAction = 'Add' | 'Delete'
export class Block {
  timestamp: number | string
  lastHash: string
  hash: string
  data: any
  constructor(
    timestamp: number | string,
    lastHash: string,
    hash: string,
    data: any
  ) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
  }

  static genesis(): Block {
    return new this(
      'time',
      '----',
      'genesis-hash',
      []
    )
  }

  static blockHash(block: Block): string {
    const { timestamp, lastHash, data } = block
    return Block.hash(timestamp, lastHash, data)
  }

  static hash(
    timestamp: number | string,
    lastHash: string,
    data: any
  ): string {
    return SHA256(
      `${timestamp}${lastHash}${data}`
    ).toString()
  }

  static mintBlock(lastBlock: Block, data: any) {
    let hash
    let timestamp: number
    const lastHash = lastBlock.hash

    timestamp = dayjs().unix()
    hash = Block.hash(timestamp, lastHash, data)
    return new this(timestamp, lastHash, hash, data)
  }

  toString(): string {
    return `Block - 
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lastHash.substring(0, 10)}
    Hash      : ${this.hash.substring(0, 10)}
    Data      : ${this.data}`
  }
}
