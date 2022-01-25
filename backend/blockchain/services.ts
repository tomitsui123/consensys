const Blockchain = require('./Blockchain')
const HttpResponse = require('../helpers/HttpResponse')

const getBlock = async () => {
  const blockchain = new Blockchain()
  return new HttpResponse(blockchain.chain)
}

export { getBlock }
