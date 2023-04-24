import prisma from '../utils/prisma'

import { CreateUserInput } from '../models/user.model'
import { encryptPassword } from '../utils/hash'

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input
  const { hash, salt } = encryptPassword(password)

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  })

  return user
}

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })

  return user
}

export async function findUsers() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true },
  })

  return users
}
