import { FastifyPluginAsync } from 'fastify'

import { attemptLogin } from '../../services/auth'

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/login', async function (request) {
        const { body } = request as typeof request & {
            body: { login: string; password: string }
        }

        const { login, password } = body

        return attemptLogin(login, password)
    })
}

export default auth
