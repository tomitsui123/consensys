import express from 'express'
import * as blockchainController from './controllers'

const router = express.Router()

router.get('/block', blockchainController.getBlocks)

module.exports = router