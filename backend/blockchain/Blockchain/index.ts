import { Block, BookingAction } from '../Block'
export class Blockchain {
  chain: Block[]
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data: any): Block {
    const block = Block.mintBlock(
      this.chain[this.chain.length - 1],
      data
    )
    if (this.isValidBlock(block)) {
      this.chain.push(block)
    }
    return block
  }

  isValidBlock(block: Block): boolean {
    console.log(block)
    const selectedBlockList = this.chain.filter(
      (b: Block) => {
        // console.log(b, block)
        return (
          b.data.roomCode === block.data.roomCode &&
          b.data.time === block.data.time &&
          b.data.user === block.data.user
        )
      }
    )
    const latestBlock = selectedBlockList.pop()
    if (
      !latestBlock ||
      latestBlock.data.action === 'Delete'
    ) {
      return block.data.action === 'Add'
    } else if (latestBlock.data.action === 'Add') {
      return block.data.action === 'Delete'
    }
    return false
  }

  isValidChain(chain: Block[]): boolean {
    if (
      JSON.stringify(chain[0]) !==
      JSON.stringify(Block.genesis())
    ) {
      return false
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i]
      const lastBlock = chain[i - 1]
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false
      }
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
