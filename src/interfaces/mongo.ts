import { Types } from 'mongoose'

export enum MongoCollections {
    'User',
    'RefreshToken',
}

export declare type ValidMongoCollection = keyof typeof MongoCollections

export const ValidMongoCollectionValues = ['User', 'RefreshToken']

export declare type SchemaReference<T> = T | string | Types.ObjectId
