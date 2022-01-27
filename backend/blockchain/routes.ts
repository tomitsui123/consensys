import express from 'express'
import * as blockchainController from './controllers'

const router = express.Router()

router.get('/blocks', blockchainController.getBlocks)
router.get('/available/:user', blockchainController.getAvailableTimeslot)
router.post('/transact', blockchainController.createTransaction)

export default router
