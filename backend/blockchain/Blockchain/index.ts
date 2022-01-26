import { Block } from '../Block'
export class Blockchain {
  chain: Block[]
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data: any): Block {
    // TODO: validate block
    const block = Block.mintBlock(
      this.chain[this.chain.length - 1],
      data
    )
    this.chain.push(block)
    return block
  }

  validateBlock() {
    
  }

  isValidChain(chain: Block[]): boolean {
    console.log('0')
    if (
      JSON.stringify(chain[0]) !==
      JSON.stringify(Block.genesis())
    ) {
      console.log('1')
      return false
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i]
      const lastBlock = chain[i - 1]
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        console.log('2')
        return false
      }
    }

    console.log('3')
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
