import { Schema } from 'mongoose'
import { ValidMongoCollection } from '../interfaces/mongo'

export const createRefObject = (
    collection: ValidMongoCollection,
    required = false,
) => ({
    type: Schema.Types.ObjectId,
    ref: collection,
    required,
})
