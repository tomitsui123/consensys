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
  let isSelectedTimeslot = blockchain.chain
    .filter(
      (e) =>
        e.data.user === user && e.data.action === 'Add'
    )
    .pop()
  const isSelectedByOthers = blockchain.chain.filter(
    (e) =>
      e.data.user !== user && e.data.action === 'Add'
  )
  let isSelectedData
  let isSelectedByOthersData: {
    isSelect?: boolean
    isOccupy?: boolean
    roomCode: string
    time: string
  }[] = []

  if (isSelectedByOthers.length > 0) {
    isSelectedByOthersData = isSelectedByOthers.reduce(
      (
        acc: {
          isOccupy: boolean
          roomCode: string
          time: string
        }[],
        cur
      ) => {
        acc.push({
          isOccupy: true,
          roomCode: cur.data.roomCode,
          time: cur.data.time,
        })
        return acc
      },
      []
    )
  }
  if (isSelectedTimeslot) {
    isSelectedData = {
      isSelect: true,
      roomCode: isSelectedTimeslot.data.roomCode,
      time: isSelectedTimeslot.data.time,
    }
    isSelectedByOthersData.push(isSelectedData)
  }
  console.log(isSelectedData, isSelectedByOthersData)

  const data = [
    {
      isSelect: true,
      roomCode: 'P1',
      time: '1',
    },
    {
      isOccupy: true,
      roomCode: 'P4',
      time: '5',
    },
  ]
  return new HttpResponse(isSelectedByOthersData)
}

export {
  getBlock,
  mintBlock,
  createTransaction,
  getAvailableTimeslot,
}
