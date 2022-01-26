import { Block } from './Block'
import { Blockchain } from './Blockchain'
import { P2pserver } from './p2pserver'
import TransactionPool from './TransactionPool'
import HttpResponse from '../helpers/HttpResponse'
import Wallet from './Wallet'

const blockchain = new Blockchain()

const transactionPool = new TransactionPool()

const wallet = new Wallet()

const p2pserver = new P2pserver(blockchain, transactionPool)

p2pserver.listen()

const getBlock = async () => {
  return new HttpResponse(blockchain.chain)
}

const mineBlock = async (data: any) => {
  const block: Block = blockchain.addBlock(data)
  p2pserver.syncChain()
  console.log(`New block added: ${block.toString()}`)
}

const getTransactions = async () => {
  return new HttpResponse(transactionPool.transactions)
}

const createTransaction = async (
  recipient: string,
  amount: number
) => {
  wallet.createTransaction(
    recipient,
    amount,
    transactionPool
  )
  p2pserver.mine()
}

const getWalletPublicKey = async () => {
  return new HttpResponse(wallet.publicKey)
}

export {
  getBlock,
  mineBlock,
  getTransactions,
  createTransaction,
  getWalletPublicKey,
}
