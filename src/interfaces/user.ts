import { Document, Schema } from 'mongoose'

import { ValidStatus } from './globals'

export default interface IUser {
    _id: Schema.Types.ObjectId
    name: string
    email: string
    password?: string
    status?: ValidStatus
    createdAt?: Date
    updatedAt?: Date
    __v?: number
}

export interface IUserDocument extends IUser, Document {
    _id: Schema.Types.ObjectId
}
