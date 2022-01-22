import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dayjs from 'dayjs'

import User from './model'

const HttpResponse = require('../helpers/HttpResponse')


const { SECRET } = process.env

const login = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ username })
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (isPasswordCorrect) {
        const token = await jwt.sign({
          data: { username },
          exp: Math.floor(Date.now() / 1000) + (60 * 60) * 5
        }, SECRET || '')
        return new HttpResponse(token)
      }
      return new HttpResponse('Incorrect password')
    }
    return new HttpResponse('The username does not exist!')
  } catch (e) {
    throw e
  }
}

const register = async (username: string, password: string) => {
  try {
    const user = await User.countDocuments({ username })
    if (user > 0) {
      return new HttpResponse('The username existed!', 400)
    }
    const hash = await bcrypt.hash(password, 12)
    const data = await User.create({
      username,
      password: hash
    })
    return new HttpResponse(data)
  } catch (e) {
    throw e
  }
}

const logout = async (authorization: string) => {
  try {
    const { data } = jwt.decode(authorization.split('Bearer ')[1]) as JwtPayload
    const { username } = data
    if (!authorization) return new HttpResponse('')
    await User.findOneAndUpdate({ username }, { logoutDatetime: dayjs().unix() })
    return new HttpResponse('User logout!')
  } catch (e) {
    throw e
  }
}

export { login, register, logout }