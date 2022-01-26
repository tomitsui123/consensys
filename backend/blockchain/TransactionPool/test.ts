import {
  expect,
  describe,
  beforeEach,
  it,
} from '@jest/globals'

import Transaction from '../Wallet/Transaction'
import TransactionPool from '.'
import Wallet from '../Wallet'

describe('Transaction Pool', () => {
  let transactionPool, wallet, transaction

  beforeEach(() => {
    transactionPool = new TransactionPool()
    wallet = new Wallet()
    transaction = wallet.createTransaction(
      'random-address',
      30,
      transactionPool
    )
  })

  it('adds a transaction to the pool', () => {
    expect(
      transactionPool.transactions.find(
        (t: Transaction) => t.id === transaction.id
      )
    ).toEqual(transaction)
  })

  it('updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction)
    const newTransaction = transaction.update(
      wallet,
      'foo-4ddr355',
      40
    )
    transactionPool.updateOrAddTransaction(newTransaction)
    expect(
      JSON.stringify(
        transactionPool.transactions.find(
          (t) => t.id === transaction.id
        )
      )
    ).not.toEqual(oldTransaction)
  })
})
