import Transaction from '../Wallet/Transaction'

export default class TransactionPool {
  transactions: Transaction[]
  constructor() {
    this.transactions = []
  }

  updateOrAddTransaction(transaction: Transaction) {
    let transactionWithId = this.transactions.find(
      (t: Transaction) => t.id === transaction.id
    )

    if (transactionWithId) {
      this.transactions[
        this.transactions.indexOf(transactionWithId)
      ] = transaction
    } else {
      this.transactions.push(transaction)
    }
  }

  existingTransaction(address: string) {
    return this.transactions.find(
      (t) => t.input.address === address
    )
  }

  validTransactions(): Transaction[] {
    return this.transactions.filter(
      (transaction: Transaction) => {
        const outputTotal = transaction.outputs.reduce(
          (total, output) => {
            return total + output.amount
          },
          0
        )
        if (transaction.input.amount !== outputTotal) {
          console.log(
            `Invalid transaction from ${transaction.input.address}`
          )
          return
        }

        if (!Transaction.verifyTransaction(transaction)) {
          console.log(
            `Invalid signature from ${transaction.input.address}`
          )
          return
        }

        return transaction
      }
    )
  }
  clear() {
    this.transactions = []
  }
}
