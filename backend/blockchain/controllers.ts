import { Request, Response } from 'express'
import HttpResponse from '../helpers/HttpResponse'
import * as blockchainService from './services'

const getBlocks = async (req: Request, res: Response) => {
  const response = await blockchainService.getBlock()
  return await res
    .status(response.statusCode)
    .json(response)
}

const mineBlock = async (req: Request, res: Response) => {
  await blockchainService.mineBlock(req.body)

  return res.redirect('/blockchain/blocks')
}

const getTransactions = async (
  _: Request,
  res: Response
) => {
  const response = await blockchainService.getTransactions()
  return await res
    .status(response.statusCode)
    .json(response)
}

const createTransaction = async (
  req: Request,
  res: Response
) => {
  const {
    recipient,
    amount,
  }: { recipient: string; amount: number } = req.body
  await blockchainService.createTransaction(
    recipient,
    amount
  )
  res.redirect('/blockchain/transactions')
}

const getWalletPublicKey = async (_: Request, res: Response) => {
  const response =
    await blockchainService.getWalletPublicKey()
  return res.status(response.statusCode).json(response)
}

export {
  getBlocks,
  mineBlock,
  getTransactions,
  createTransaction,
  getWalletPublicKey,
}
