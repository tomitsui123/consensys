import { Request, Response } from 'express'
import HttpResponse from '../helpers/HttpResponse'
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
    roomCode,
    time
  }: {
    user: string
    action: BookingAction
    roomCode: string
    time: string
  } = req.body
  try {
    await blockchainService.createTransaction(
      user,
      action,
      roomCode,
      time
    )
  } catch (e) {
    return new HttpResponse(e, 400)
  }
  return res.redirect(`/blockchain//available/${user}`)

}

const getAvailableTimeslot = async (
  req: Request,
  res: Response
) => {
  const { user } = req.params
  const response =
    await blockchainService.getAvailableTimeslot(user)
  return res.status(response.statusCode).json(response)
}

export {
  getBlocks,
  createTransaction,
  getAvailableTimeslot,
}
