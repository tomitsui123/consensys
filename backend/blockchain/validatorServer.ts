import { WebSocket, WebSocketServer } from 'ws'
import { Blockchain } from './Blockchain'

const P2P_PORT = process.env.P2P_PORT || 5001

const peers = process.env.PEERS
  ? process.env.PEERS.split(',')
  : []

const MESSAGE_TYPE = {
  chain: 'CHAIN',
  mint: 'MINT',
}

export class P2pserver {
  blockchain: Blockchain
  sockets: WebSocket[]
  server: WebSocketServer
  constructor(blockchain: Blockchain) {
    this.blockchain = blockchain
    this.sockets = []
    this.server = new WebSocket.Server({
      port:
        typeof P2P_PORT === 'string'
          ? parseInt(P2P_PORT)
          : P2P_PORT,
    })
  }

  listen() {
    this.server.on('connection', (socket) => {
      console.log('hihihi')
      this.connectSocket(socket)
    })

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
      // console.log('data ', data)

      switch (data.type) {
        case MESSAGE_TYPE.chain:
          this.blockchain.replaceChain(data.chain)
          break
        case MESSAGE_TYPE.mint:
          this.mint(data)
          console.log(`I handle the message(PORT:${P2P_PORT})`)
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
      console.log(socket.url)
      this.sendChain(socket)
    })
  }

  mint(data: any) {
    this.blockchain.addBlock(data)
    this.syncChain()
  }

  chooseValidator(data: any) {
    this.sockets.forEach((socket) =>
      console.log(socket.url)
    )
    const randomSocket =
      this.sockets[
        Math.floor(Math.random() * this.sockets.length)
      ]
    console.log(randomSocket.url)
    randomSocket.send(JSON.stringify({
      type: MESSAGE_TYPE.mint,
      data
    }))
  }
}
