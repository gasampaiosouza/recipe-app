import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const USER_CORE = {
  name: z.string(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
}

const USER_SCHEMA = z.object({
  ...USER_CORE,
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
})

const USER_LOGIN = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),

  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
})

const LOGIN_RESPONSE = z.object({ accessToken: z.string() })
const USER_RESPONSE = z.object({ ...USER_CORE })

export type CreateUserInput = z.infer<typeof USER_SCHEMA>
export type LoginInput = z.infer<typeof USER_LOGIN>

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  USER_SCHEMA,
  USER_LOGIN,
  LOGIN_RESPONSE,
  USER_RESPONSE,
})
