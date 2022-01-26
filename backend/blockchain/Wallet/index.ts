import { ec } from 'elliptic'
import { Block } from '../Block'
import { Blockchain } from '../Blockchain'
import * as ChainUtil from '../ChainUtil'
import TransactionPool from '../TransactionPool'
import Transaction, { IOutput } from './Transaction'

const { INITIAL_BALANCE } = require('../config')

export default class Wallet {
  balance: number
  keyPair: ec.KeyPair
  publicKey: string
  constructor() {
    this.balance = INITIAL_BALANCE
    this.keyPair = ChainUtil.genKeyPair()
    this.publicKey = this.keyPair
      .getPublic()
      .encode('hex', false)
  }

  sign(dataHash: string) {
    return this.keyPair.sign(dataHash)
  }

  createTransaction(
    recipient: string,
    amount: number,
    transactionPool: TransactionPool
  ) {
    if (amount > this.balance) {
      console.log(
        `Amount: ${amount} exceeds the current balance: ${this.balance}`
      )
      return
    }

    let transaction = transactionPool.existingTransaction(
      this.publicKey
    )

    if (transaction) {
      transaction.update(this, recipient, amount)
    } else {
      transaction = Transaction.newTransaction(
        this,
        recipient,
        amount
      )
      if (transaction)
        transactionPool.updateOrAddTransaction(transaction)
    }

    return transaction
  }

  // calculateBalance(blockchain: Blockchain) {
  //   let balance = this.balance

  //   let transactions: Transaction[] = []

  //   blockchain.chain.forEach((block: Block) =>
  //     block.data.forEach((transaction: Transaction) => {
  //       transactions.push(transaction)
  //     })
  //   )

  //   const walletInputTransactions = transactions.filter(
  //     (transaction: Transaction) =>
  //       transaction.input.address === this.publicKey
  //   )

  //   let startTime = 0

  //   if (walletInputTransactions.length > 0) {
  //     const recentInputTransaction =
  //       walletInputTransactions.reduce((prev, current) =>
  //         prev.input.timestamp > current.input.timestamp
  //           ? prev
  //           : current
  //       )

  //     balance = recentInputTransaction.outputs.find(
  //       (output: IOutput) => output.address === this.publicKey
  //     ).amount

  //     startTime = recentInputTransaction.input.timestamp
  //   }

  //   transactions.forEach((transaction: Transaction) => {
  //     if (transaction.input.timestamp > startTime) {
  //       transaction.outputs.find((output) => {
  //         if (output.address === this.publicKey) {
  //           balance += output.amount
  //         }
  //       })
  //     }
  //   })
  //   return balance
  // }

  toString() {
    return `Wallet - 
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`
  }
}
