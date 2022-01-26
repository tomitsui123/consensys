import express from 'express'
import * as loginController from './controller'

const router = express.Router()

router.post('/login', loginController.login)
router.get('/logout', loginController.logout)
router.post('/register', loginController.register)

export default router