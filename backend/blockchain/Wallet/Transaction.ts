import Wallet from '../Wallet'
import * as ChainUtil from '../ChainUtil'

export interface IOutput {
  amount: number
  address: string
}

interface IInput {
  timestamp: number
  balance: number
  signature: string
  publicKey: string
}

export default class Transaction {
  id: string
  input: any
  outputs: IOutput[]
  constructor() {
    this.id = ChainUtil.id()
    this.input = null
    this.outputs = []
  }

  update(
    senderWallet: Wallet,
    recipient: string,
    amount: number
  ) {
    const senderOutput = this.outputs.find(
      (output) => output.address === senderWallet.publicKey
    )

    if (amount > senderWallet.balance) {
      console.log(`Amount ${amount} exceeds balance`)
      return
    }
    if (!senderOutput) {
      console.log('There is no sender output')
      return
    }
    senderOutput.amount = senderOutput.amount - amount
    this.outputs.push({
      amount: amount,
      address: recipient,
    })
    Transaction.signTransaction(this, senderWallet)

    return this
  }

  static newTransaction(
    senderWallet: Wallet,
    recipient: string,
    amount: number
  ): Transaction | undefined {
    if (amount > senderWallet.balance) {
      console.log(`Amount : ${amount} exceeds the balance`)
      return
    }
    const transaction = new this()

    transaction.outputs.push(
      ...[
        {
          amount: senderWallet.balance - amount,
          address: senderWallet.publicKey,
        },
        { amount: amount, address: recipient },
      ]
    )
    Transaction.signTransaction(transaction, senderWallet)

    return transaction
  }

  static signTransaction(
    transaction: Transaction,
    senderWallet: Wallet
  ) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(
        ChainUtil.hash(transaction.outputs)
      ),
    }
  }

  static verifyTransaction(transaction: Transaction) {
    return ChainUtil.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    )
  }
}
