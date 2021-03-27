import { FastifyPluginAsync } from 'fastify'
import { Schema } from 'mongoose'
import IUser from '../../interfaces/user'
import {
    createUser,
    deleteUser,
    editUser,
    findAllUsers,
    findUser,
} from '../../services/user'

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function () {
        return findAllUsers()
    })

    fastify.get('/:id', async function (request) {
        const { id } = request?.params as typeof request.params & { id: string }

        return findUser(id)
    })

    fastify.patch('/:id', async function (request) {
        const { body, params } = request as typeof request & {
            body: Partial<IUser>
            params: { id: string }
        }

        const { id } = params

        return editUser(id, body)
    })

    fastify.post('/', async function (request) {
        const { body } = request as typeof request & { body: Partial<IUser> }

        return await createUser(body)
    })

    fastify.delete('/:id', async function (request) {
        const { id } = request?.params as typeof request.params & {
            id: Schema.Types.ObjectId
        }

        return await deleteUser(id)
    })
}

export default users
