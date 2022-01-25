import { Block } from './Block'

const Blockchain = require('./Blockchain')
const HttpResponse = require('../helpers/HttpResponse')

const blockchain = new Blockchain()
const getBlock = async () => {
  return new HttpResponse(blockchain.chain)
}

const mineBlock = async (data: any) => {
  const block: typeof Block = blockchain.addBlock(data)
  console.log(`New block added: ${block.toString()}`)
}

export { getBlock, mineBlock }
