import Fastify from 'fastify'
import type { FastifyRequest, FastifyReply } from 'fastify'

import fjwt from '@fastify/jwt'
import * as dotenv from 'dotenv'

import { userSchemas } from './models/user.model'
import userRoutes from './routes/user.routes'

dotenv.config()

function startServer() {
  const server = Fastify()
  const schemas = [...userSchemas]

  server.register(fjwt, {
    secret: process.env.JWT_SECRET as string,
  })

  server.decorate('auth', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (error) {
      reply.send(error)
    }
  })

  server.get('/healthcheck', () => ({ status: 'OK' }))

  server.addHook('preHandler', async (req, _, done) => {
    req.jwt = server.jwt
    // return done()
  })

  schemas.forEach((schema) => server.addSchema(schema))

  server.register(userRoutes, { prefix: 'api/users' })

  return server
}

export default startServer
