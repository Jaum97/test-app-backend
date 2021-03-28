import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.get('/root', async function (request) {
        fastify.log.info(request.body)

        return { root: true }
    })
}

export default root
