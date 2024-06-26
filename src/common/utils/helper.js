import { DateTime } from 'luxon'
import { randomBytes } from 'crypto'
import { compare, hash } from 'bcrypt'
import { ENVIRONMENT } from '../config/environment.js'
import jwt from 'jsonwebtoken'

/**
 * Generates a random string of the specified length.
 *
 * @param {number} length - The length of the random string to generate.
 * @return {string} - The generated random string.
 */
export function generateRandomString(length) {
    return randomBytes(length).toString('hex')
}

export const hashData = async (data) => {
    const hashedData = await hash(data, 10)
    return hashedData
}

export const compareData = async (data, hashedData) => {
    const isValid = await compare(data, hashedData)
    return isValid
}

export const signData = (data, secret, expiresIn) => {
    return jwt.sign({ ...data }, secret, {
        expiresIn,
    })
}

export const decodeData = (token, secret) => {
    return jwt.verify(token, secret)
}

export const setCookie = (res, name, value, options = {}) => {
    res.cookie(name, value, {
        httpOnly: true,
        secure: ENVIRONMENT.APP.ENV === 'prod',
        path: '/',
        sameSite: 'none',
        ...options,
    })
}

export function formatDate(dateTime, zone) {
    console.log(dateTime.toString())
    const date = `${dateTime}`.slice(0, -1)
    console.log(date)

    const utcDt = DateTime.fromISO(2024, 5, 20, 10, 0) // Example UTC datetime
    const userLocalDate = utcDt.setZone(zone)
    const dt = DateTime.fromISO(dateTime)
    console.log(dt, 'dt')
  return dt.toLocaleString(DateTime.DATE_FULL)
}
