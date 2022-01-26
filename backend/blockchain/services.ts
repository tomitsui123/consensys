import { Block, BookingAction } from './Block'
import { Blockchain } from './Blockchain'
import { P2pserver } from './validatorServer'
import HttpResponse from '../helpers/HttpResponse'

const blockchain = new Blockchain()

const p2pserver = new P2pserver(blockchain)

p2pserver.listen()

const getBlock = async () => {
  return new HttpResponse(blockchain.chain)
}

const mintBlock = async (data: any) => {
  const block: Block = blockchain.addBlock(data)
  p2pserver.syncChain()
  console.log(`New block added: ${block.toString()}`)
}

const createTransaction = async (
  user: string,
  action: BookingAction,
  bookingSession: string
) => {
  p2pserver.chooseValidator({
    user,
    bookingSession,
    action,
  })
}

export { getBlock, mintBlock, createTransaction }
