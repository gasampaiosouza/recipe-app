import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreateUserInput } from '../models/user.model'

import { findUsers, createUser, findUserByEmail } from '../services/user.service'
import { LoginInput } from '../models/user.model'
import { verifyPassword } from '../utils/hash'

export async function handleUserRegister(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {
  const { body } = request

  try {
    const user = await createUser(body)

    return reply.code(201).send(user)
  } catch (error) {
    console.log(error)
    return reply.code(500).send(error)
  }
}

export async function handleLogin(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  const { body } = request

  const user = await findUserByEmail(body.email)

  if (!user) {
    const message = 'Invalid email or password'
    return reply.code(404).send({ message })
  }

  const isCorrectPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  })

  if (!isCorrectPassword) {
    const message = 'Invalid email or password'
    return reply.code(401).send({ message })
  }

  const { password, salt, ...rest } = user
  return { accessToken: request.jwt.sign(rest) }
}

export async function handleGetUsers() {
  const users = await findUsers()

  return users
}
