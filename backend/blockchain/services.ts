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
  roomCode: string,
  time: string
) => {
  p2pserver.chooseValidator({
    user,
    action,
    roomCode,
    time,
  })
}

const getAvailableTimeslot = async (user: string) => {
  let userLastBlock = blockchain.chain
    .filter((e) => e.data.user === user)
    .pop()
  const isSelectedBlock =
    userLastBlock && userLastBlock.data.action === 'Add'
      ? {
          isSelect: true,
          roomCode: userLastBlock.data.roomCode,
          time: userLastBlock.data.time,
        }
      : undefined
  console.log('isSelectedBlock', isSelectedBlock)

  const userList = blockchain.chain.reduce(
    (acc: string[], cur) => {
      if (!cur) return acc
      if (cur.data.user && cur.data.user !== user) {
        acc.push(cur.data.user)
      }
      return acc
    },
    []
  )
  console.log('selectedUserList', userList)
  const isOccupyList = []
  for (var i = 0; i < userList.length; i++) {
    let lastBlock = blockchain.chain
      .filter((e) => e.data.user === userList[i])
      .pop()
    if (lastBlock && lastBlock.data.action === 'Add') {
      isOccupyList.push({
        isOccupy: true,
        roomCode: lastBlock.data.roomCode,
        time: lastBlock.data.time,
      })
    }
  }
  console.log('isOccupyList', isOccupyList)
  if (isSelectedBlock) {
    isOccupyList.push(isSelectedBlock)
  }
  return new HttpResponse(isOccupyList)
}

export {
  getBlock,
  mintBlock,
  createTransaction,
  getAvailableTimeslot,
}
