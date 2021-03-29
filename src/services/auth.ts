import { compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { omit } from 'ramda'
import { RefreshTokenModel, UserModel } from '../models'
import { HttpCodes } from '../utils/http'
import { isObjValidAndNotEmpty } from '../utils/object'

export const attemptLogin = async (login: string, password: string) => {
    const $or = [{ name: login }, { email: login }]

    const [DBUser] = await UserModel.find({ $or }, '+password').lean()

    if (!DBUser?.password) {
        throw Error('incorrect user or password')
    }

    const matchesPassword = await compare(password, DBUser.password)

    if (!matchesPassword) {
        throw Error('incorrect user or password')
    }

    const { _id: id } = DBUser
    const { JWT_KEY = 'key' } = process.env

    const accessToken = sign({ id }, JWT_KEY, { expiresIn: '24h' })
    const refreshToken = sign({ id }, JWT_KEY, { expiresIn: '30 days' })

    const obj = {
        _id: new Types.ObjectId(),
        user: id,
        refreshToken,
        status: 'ACTIVE',
    }

    const doc = await new RefreshTokenModel(obj).save()

    if (!doc) {
        throw Error('Error while saving token')
    }

    return omit(['password', 'updatedAt', '__v', 'createdAt'], {
        ...DBUser,
        tokens: { accessToken, refreshToken },
    })
}

export const verifyJWT = async (token: string) => {
    const { JWT_KEY = 'key' } = process.env

    try {
        const isValid = (verify(token, JWT_KEY, (_, decoded) => {
            if (!decoded) return false

            return isObjValidAndNotEmpty(decoded)
        }) as unknown) as boolean

        if (!isValid) {
            throw Error('Token expired')
        }

        const { SUCCESS, APPLICATION_EXCEPTION } = HttpCodes

        const response = isValid ? SUCCESS : APPLICATION_EXCEPTION

        return { response }
    } catch (err) {
        return err
    }
}
