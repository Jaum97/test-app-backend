import { Schema } from 'mongoose'
import { complement } from 'ramda'
import IUser from '../interfaces/user'
import { UserModel } from '../models'
import { hashBodyPassword } from '../utils/users'

export const createUser = async (body: Partial<IUser>) => {
    const { name, email, password } = body

    const invalid = [name, email, password].filter(complement(Boolean))

    if (invalid.length) {
        throw new Error(`User is missing: ${invalid.join(', ')}`)
    }

    const users = await UserModel.find({ email })

    if (users.length) {
        throw new Error(`User with email ${email} already exists`)
    }

    const defaultUserInfo = {
        status: 'ACTIVE',
        createdAt: Date.now(),
    }

    const userData = Object.assign(defaultUserInfo, hashBodyPassword(body))

    const doc = await new UserModel(userData).save()

    return doc
}

export const findUser = (id: string) => {
    return UserModel.findById(id)
}

export const findAllUsers = () => {
    return UserModel.find()
}

export const editUser = (id: string, body: Partial<IUser>) => {
    const validatedBody = hashBodyPassword(body)

    return UserModel.findByIdAndUpdate(id, validatedBody, { new: true })
}

export const deleteUser = async (id: Schema.Types.ObjectId) => {
    return UserModel.findOneAndDelete({ _id: id })
}
