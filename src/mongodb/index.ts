import mongoose from 'mongoose'
import { handleSuccess, handleError } from './handlers'

const {
    MONGO_USER,
    MONGO_DB_DEV,
    MONGO_DB_TESTS,
    MONGO_PW,
    MONGO_URL_CLUSTER,
} = process.env

const AvailableEnvs = {
    DEV: MONGO_DB_DEV,
    TESTS: MONGO_DB_TESTS,
}

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}

export async function connectMongoose(
    env: keyof typeof AvailableEnvs = 'DEV',
): Promise<void> {
    const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGO_URL_CLUSTER}/${AvailableEnvs[env]}`

    const handleMongooseSuccess = (): void => handleSuccess(env)

    await mongoose.connection.close()

    await mongoose
        .connect(uri, options)
        .then(handleMongooseSuccess)
        .catch(handleError)
}

export default connectMongoose
