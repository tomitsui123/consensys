import {
  expect,
  describe,
  beforeEach,
  it,
} from '@jest/globals'

import Transaction from './Transaction'

import Wallet from './index'
import TransactionPool from '../TransactionPool'
import { Blockchain } from '../Blockchain'

describe('Transaction', () => {
  let transaction, wallet, recipient, amount

  beforeEach(() => {
    wallet = new Wallet()
    amount = 50
    recipient = 'r3c1p13nt'
    transaction = Transaction.newTransaction(
      wallet,
      recipient,
      amount
    )
  })

  it('outputs the `amount` subtracted from the wallet balance', () => {
    expect(
      transaction.outputs.find(
        (output) => output.address === wallet.publicKey
      ).amount
    ).toEqual(wallet.balance - amount)
  })

  it('outputs the `amount` added to the recipient', () => {
    expect(
      transaction.outputs.find(
        (output) => output.address === recipient
      ).amount
    ).toEqual(amount)
  })

  it('inputs the balance of the wallet', () => {
    expect(transaction.input.amount).toEqual(wallet.balance)
  })

  it('validates a valid transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(
      true
    )
  })

  it('invalidates a invalid transaction', () => {
    transaction.outputs[0].amount = 500000
    expect(Transaction.verifyTransaction(transaction)).toBe(
      false
    )
  })

  describe('transacting with less balance', () => {
    beforeEach(() => {
      amount = 5000
      transaction = Transaction.newTransaction(
        wallet,
        recipient,
        amount
      )
    })

    it('does not create the transaction', () => {
      expect(transaction).toEqual(undefined)
    })
  })

  describe('updated transaction', () => {
    let nextAmount, nextRecipient

    beforeEach(() => {
      nextAmount = 20
      nextRecipient = 'n3xt-4ddr355'
      transaction = transaction.update(
        wallet,
        nextRecipient,
        nextAmount
      )
    })

    it("substracts the nect amount from the sender's outouts", () => {
      expect(
        transaction.outputs.find(
          (output) => output.address === wallet.publicKey
        ).amount
      ).toEqual(wallet.balance - amount - nextAmount)
    })

    it('outputs an amount for the next recipient', () => {
      expect(
        transaction.outputs.find(
          (output) => output.address === nextRecipient
        ).amount
      ).toEqual(nextAmount)
    })
  })
})

describe('Wallet', () => {
  let wallet: Wallet,
    transactionPool: TransactionPool,
    blockchain: Blockchain
  wallet = new Wallet()
  transactionPool = new TransactionPool()

  beforeEach(() => {
    wallet = new Wallet()
    transactionPool = new TransactionPool()
    blockchain = new Blockchain()
  })

  describe('creating a transaction', () => {
    let transaction, sendAmount, recipient

    beforeEach(() => {
      sendAmount = 50
      recipient = 'r4nd-4ddr355'
      transaction = wallet.createTransaction(
        recipient,
        sendAmount,
        transactionPool
      )
    })

    describe(' and doing the same transaction', () => {
      beforeEach(() => {
        wallet.createTransaction(
          recipient,
          sendAmount,
          transactionPool
        )
      })

      it('doubles the `sendAmount` subtracted from the wallet balance', () => {
        expect(
          transaction.outputs.find(
            (output) => output.address === wallet.publicKey
          ).amount
        ).toEqual(wallet.balance - sendAmount * 2)
      })

      it('clones the `sendAmount`output for the transaction ', () => {
        expect(
          transaction.outputs
            .filter(
              (output) => output.address === recipient
            )
            .map((output) => output.amount)
        ).toEqual([sendAmount, sendAmount])
      })
    })
  })
})
