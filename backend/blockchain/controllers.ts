import { Request, Response } from 'express'
import * as blockchainService from './services'

const getBlocks = async (req: Request, res: Response) => {
  const response = await blockchainService.getBlock()
  return await res
    .status(response.statusCode)
    .json(response)
}

export { getBlocks }
