import { NextFunction, Request, Response } from 'express'
import * as loginService from './service'

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body
    const response = await loginService.login(username, password)
    return await res.status(response.statusCode).json(response)
  } catch (e) {
    next(e)
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  const response = await loginService.register(username, password)
  return await res.status(response.statusCode).json(response)
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers.authorization)
  const response = await loginService.logout(req.headers.authorization || '')
  return await res.status(response.statusCode).json(response)
}

export { login, register, logout }