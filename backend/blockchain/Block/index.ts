import { DIFFICULTY, MINE_RATE } from '../config'

const SHA256 = require('crypto-js/sha256')
const dayjs = require('dayjs')

export class Block {
  timestamp: number
  lastHash: string
  hash: string
  data: any
  nonce: number
  difficulty: number
  constructor(
    timestamp: number,
    lastHash: string,
    hash: string,
    data: any,
    nonce: number,
    difficulty: number
  ) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.difficulty = difficulty
    this.nonce = nonce
  }

  static genesis(): Block {
    return new this(
      dayjs().unix(),
      '----',
      'genesis-hash',
      [],
      0,
      DIFFICULTY
    )
  }

  static blockHash(block: Block): string {
    const { timestamp, lastHash, data, difficulty, nonce } =
      block
    return Block.hash(
      timestamp,
      lastHash,
      data,
      nonce,
      difficulty
    )
  }

  static hash(
    timestamp: number,
    lastHash: string,
    data: any,
    nonce: number,
    difficulty: number
  ): string {
    return SHA256(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}`
    ).toString()
  }

  static mineBlock(lastBlock: Block, data: any) {
    let hash
    let timestamp: number
    const lastHash = lastBlock.hash

    let { difficulty } = lastBlock

    let nonce = 0
    //generate the hash of the block
    do {
      nonce++
      timestamp = dayjs().unix()
      difficulty = Block.adjustDifficulty(
        lastBlock,
        timestamp
      )
      hash = Block.hash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      )
      // checking if we have the required no of leading number of zeros
    } while (
      hash.substring(0, difficulty) !==
      '0'.repeat(difficulty)
    )

    return new this(
      timestamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty
    )
  }

  static adjustDifficulty(
    lastBlock: Block,
    currentTime: number
  ): number {
    let { difficulty } = lastBlock
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1
    return difficulty
  }

  toString(): string {
    return `Block - 
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lastHash.substring(0, 10)}
    Hash      : ${this.hash.substring(0, 10)}
    Data      : ${this.data}`
  }
}
