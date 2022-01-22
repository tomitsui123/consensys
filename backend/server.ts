import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import JsonWebToken from 'jsonwebtoken'

const PORT = 8080
const { DB_USERNAME, DB_PASSWORD, DB_PORT } = process.env
const app = express()

mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@db:${DB_PORT}`).then(() => {
  console.log('DB connection successful')
}).catch((err) => {
  console.log('Error occurs: ', err)
})

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome!')
})

app.get('/user', (req, res) => {
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})