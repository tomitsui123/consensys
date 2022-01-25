const SHA256 = require('crypto-js/sha256')
const dayjs = require('dayjs')

export interface IBlock {
  timestamp: string
  lastHash: string
  hash: string
  data: any
}

class Block {
  timestamp: string
  lastHash: string
  hash: string
  data: any
  constructor(timestamp: string, lastHash: string, hash: string, data: any) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
  }

  static genesis(): Block {
    return new this(
      'Genesis time',
      '----',
      'genesis-hash',
      []
    )
  }

  static blockHash(block: IBlock): string {
    const { timestamp, lastHash, data } = block
    return Block.hash(timestamp, lastHash, data)
  }

  static hash(timestamp: string, lastHash: string, data: any): string {
    return SHA256(
      `${timestamp}${lastHash}${data}`
    ).toString()
  }

  static mineBlock(lastBlock: IBlock, data: any): Block {
    let timestamp = dayjs().unix()
    const lastHash = lastBlock.hash
    let hash = this.hash(timestamp, lastHash, data)
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

module.exports = Block
