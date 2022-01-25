import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const UserRouter = require('./user/routes')
const BlockchainRouter = require('./blockchain/routes')

const PORT = 8080
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT } = process.env
const app = express()

mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/booking_system?authSource=admin`).then(() => {
  console.log('DB connection successful')
}).catch((err) => {
  console.log('Error occurs: ', err)
})

app.use(bodyParser.json())

app.use('/api', UserRouter)

app.use('/blockchain', BlockchainRouter)

app.get('/', (req, res) => {
  res.send(`Welcome to Tommy's Consensys take home task!`)
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})