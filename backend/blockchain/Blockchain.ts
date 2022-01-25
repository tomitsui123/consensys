const Block = require('./Block')
export class Blockchain {
  chain: Block[]
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data)
    this.chain.push(block)
    return block
  }
  isValidChain(chain) {
    
  }
}

module.exports = Blockchain