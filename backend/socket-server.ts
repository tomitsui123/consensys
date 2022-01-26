import { P2pserver } from './blockchain/p2pserver'

const Blockchain = require('./blockchain/Blockchain')

const blockchain = new Blockchain()

const p2pserver = new P2pserver(blockchain)

p2pserver.listen()