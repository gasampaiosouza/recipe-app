import { FastifyInstance } from 'fastify'
import { $ref } from '../models/user.model'

import {
  handleGetUsers,
  handleLogin,
  handleUserRegister,
} from '../controllers/user.controller'

async function userRoutes(server: FastifyInstance) {
  const registerUserTypings = {
    schema: { body: $ref('USER_SCHEMA'), response: { 201: $ref('USER_RESPONSE') } },
  }

  const loginUserTypings = {
    schema: { body: $ref('USER_LOGIN'), response: { 200: $ref('LOGIN_RESPONSE') } },
  }

  server.get('/', { preHandler: [server.auth] }, handleGetUsers)

  server.post('/', registerUserTypings, handleUserRegister)
  server.post('/login', loginUserTypings, handleLogin)
}

export default userRoutes
