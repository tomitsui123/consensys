import express from 'express'
import * as blockchainController from './controllers'

const router = express.Router()

router.get('/blocks', blockchainController.getBlocks)
router.post('/mine', blockchainController.mineBlock)

module.exports = router