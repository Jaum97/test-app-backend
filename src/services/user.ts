import { Schema, Types } from 'mongoose'
import { omit } from 'ramda'
import IUser from '../interfaces/user'
import { UserModel } from '../models'
import { hashBodyPassword } from '../utils/users'

export const createUser = async (body: Partial<IUser>) => {
    const { name, email, password } = body

    const invalid = [
        !name && 'name',
        !email && 'email',
        !password && 'password',
    ].filter(Boolean)

    console.log({ name, email, password, invalid })

    if (invalid.length) {
        throw new Error(`User is missing: ${invalid.join(', ')}`)
    }

    const users = await UserModel.find({ email })

    if (users.length) {
        throw new Error(`User with email ${email} already exists`)
    }

    const defaultUserInfo = {
        _id: new Types.ObjectId(),
        status: 'ACTIVE',
        createdAt: Date.now(),
    }

    const userData = Object.assign(hashBodyPassword(body), defaultUserInfo)

    const doc = await new UserModel(userData).save()

    return doc
}

export const findUser = (id: string) => {
    return UserModel.findById(id)
}

export const findAllUsers = () => {
    return UserModel.find({})
}

export const findAllUsersThatAreNotRequestor = (_id: string) => {
    return UserModel.find({ _id: { $not: { $eq: _id as any } } })
}

export const editUser = (id: string, body: Partial<IUser>) => {
    const removeInvalidFields = omit(['updatedAt', 'createdAt', '__v', '_id'])

    const validatedBody = removeInvalidFields(hashBodyPassword(body))

    return UserModel.findByIdAndUpdate(id, validatedBody, { new: true })
}

export const deleteUser = async (id: Schema.Types.ObjectId) => {
    return UserModel.findOneAndDelete({ _id: id })
}
