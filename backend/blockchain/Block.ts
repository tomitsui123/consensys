const SHA256 = require('crypto-js/sha256')

class Block {
  timestamp: number
  lastHash: string
  hash: string
  data: any
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
  }

  static genesis() {
    return new this(
      'Genesis time',
      '----',
      'genesis-hash',
      []
    )
  }

  static hash(timestamp, lastHash, data) {
    return SHA256(
      `${timestamp}${lastHash}${data}`
    ).toString()
  }

  static mineBlock(lastBlock, data) {
    let hash
    let timestamp
    const lastHash = lastBlock.hash

    return new this(timestamp, lastHash, hash, data)
  }

  toString() {
    return `Block - 
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lastHash.substring(0, 10)}
    Hash      : ${this.hash.substring(0, 10)}
    Data      : ${this.data}`
  }
}

module.exports = Block