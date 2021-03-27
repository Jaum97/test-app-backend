import { Schema, model } from 'mongoose'

import { VALID_EMAIL } from '../utils/email'
import { IUserDocument } from '../interfaces/user'

const User = new Schema<IUserDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: VALID_EMAIL,
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'PENDING', 'INACTIVE', 'DELETED'],
        required: true,
    },
    password: {
        type: String,
        select: false,
    },
})

User.set('timestamps', true)

export default model<IUserDocument>('User', User)
