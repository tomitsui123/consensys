import express from 'express'
import * as blockchainController from './controllers'

const router = express.Router()

router.get('/blocks', blockchainController.getBlocks)
router.post('/mine', blockchainController.mineBlock)
router.get('/transactions', blockchainController.getTransactions)
router.post('/transact', blockchainController.createTransaction)
router.get('/public-key', blockchainController.getWalletPublicKey)

export default router
