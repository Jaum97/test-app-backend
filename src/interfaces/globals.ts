import { Schema } from 'mongoose'

/**
 * http://www.typescriptlang.org/docs/handbook/enums.html#enums-at-compile-time
 */
export declare enum Roles {
    SUPERADMIN,
    ADMIN,
    COLLABORATOR,
}

export declare type ValidRole = keyof typeof Roles

export declare enum Status {
    ACTIVE,
    PENDING,
    INACTIVE,
    DELETED,
}

export declare type ValidStatus = keyof typeof Status

export declare type ValidProp = string | number | symbol

export declare type ValidId = string | Schema.Types.ObjectId
