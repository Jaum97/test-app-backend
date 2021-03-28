import { allPass } from 'ramda'

export const isValidObj = (obj: any): boolean =>
    obj === Object(obj) && !Array.isArray(obj)

export const objHasProps = (obj: any): boolean =>
    Boolean(obj && Object.keys(obj).length)

/**
 * - isObjValidAndNotEmpty checks if object is valid and not empty
 * @param x object to verify
 * @returns boolean
 */
export const isObjValidAndNotEmpty = allPass([isValidObj, objHasProps])
