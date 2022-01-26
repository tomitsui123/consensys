import { WebSocket } from 'ws'
import { Blockchain } from './Blockchain'

const P2P_PORT = process.env.P2P_PORT || 5001

const peers = process.env.PEERS
  ? process.env.PEERS.split(',')
  : []

const MESSAGE_TYPE = {
  chain: 'CHAIN',
  transaction: 'TRANSACTION',
  clear_transactions: 'CLEAR_TRANSACTIONS',
}

export class P2pserver {
  blockchain: Blockchain
  sockets: WebSocket[]
  constructor(
    blockchain: Blockchain,
  ) {
    this.blockchain = blockchain
    this.sockets = []
  }

  listen() {
    const server = new WebSocket.Server({
      port:
        typeof P2P_PORT === 'string'
          ? parseInt(P2P_PORT)
          : P2P_PORT,
    })

    server.on('connection', (socket) =>
      this.connectSocket(socket)
    )

    this.connectToPeers()

    console.log(
      `Listening for peer to peer connection on port : ${P2P_PORT}`
    )
  }

  connectSocket(socket: WebSocket) {
    this.sockets.push(socket)
    console.log('Socket connected')
    this.messageHandler(socket)
    socket.send(JSON.stringify(this.blockchain))
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocket(peer)
      socket.on('open', () => this.connectSocket(socket))
    })
  }

  messageHandler(socket: WebSocket) {
    socket.on('message', (message: string) => {
      const data = JSON.parse(message)
      console.log('data ', data)

      switch (data.type) {
        case MESSAGE_TYPE.chain:
          this.blockchain.replaceChain(data.chain)
          break
      }
    })
  }

  sendChain(socket: WebSocket) {
    socket.send(
      JSON.stringify({
        type: MESSAGE_TYPE.chain,
        chain: this.blockchain.chain,
      })
    )
  }

  syncChain() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket)
    })
  }

  mint() {
    this.blockchain.addBlock('')
    this.syncChain()
  }
}
