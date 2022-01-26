import { Block } from '../Block'
export class Blockchain {
  chain: Block[]
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data: any): Block {
    const block = Block.mineBlock(
      this.chain[this.chain.length - 1],
      data
    )
    this.chain.push(block)
    return block
  }
  isValidChain(chain: Block[]): boolean {
    if (
      JSON.stringify(chain[0]) !==
      JSON.stringify(Block.genesis())
    )
      return false

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i]
      const lastBlock = chain[i - 1]
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      )
        return false
    }

    return true
  }
  replaceChain(newChain: Block[]): void {
    if (newChain.length <= this.chain.length) {
      console.log(
        'Recieved chain is not longer than the current chain'
      )
      return
    } else if (!this.isValidChain(newChain)) {
      console.log('Recieved chain is invalid')
      return
    }

    console.log(
      'Replacing the current chain with new chain'
    )
    this.chain = newChain
  }
}