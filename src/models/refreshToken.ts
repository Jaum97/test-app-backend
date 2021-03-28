import { model, Schema } from 'mongoose'
import { createRefObject } from '../utils/mongo'

export const RefreshTokenSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: createRefObject('User', true),
    refreshToken: String,
    status: {
        type: String,
        enum: ['ACTIVE', 'PENDING', 'INACTIVE', 'DELETED'],
        required: true,
    },
})

RefreshTokenSchema.set('timestamps', true)

export default model('Refresh_Token', RefreshTokenSchema)
