import { Request, Response } from 'express'
import { BookingAction } from './Block'
import * as blockchainService from './services'

const getBlocks = async (req: Request, res: Response) => {
  const response = await blockchainService.getBlock()
  return await res
    .status(response.statusCode)
    .json(response)
}

const createTransaction = async (
  req: Request,
  res: Response
) => {
  const {
    user,
    action,
    bookingSession,
  }: {
    user: string
    action: BookingAction
    bookingSession: string
  } = req.body
  await blockchainService.createTransaction(
    user,
    action,
    bookingSession
  )
  res.redirect('/blockchain/blocks')
}

const getAvailableTimeslot = async (req: Request, res: Response) => {
  console.log('hihihi')
  const response = await blockchainService.getAvailableTimeslot()
  return res.status(response.statusCode).json(response)
}

export {
  getBlocks,
  createTransaction,
  getAvailableTimeslot
}
