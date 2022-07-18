const { compare, hash } = require('bcrypt')

const saltRounds = 10

/**
 * Function that encrypt the user password and return a hash
 * @param password
 */
const generatePasswordHash = async ( password ) => {
    return await hash( password, saltRounds )
}

/**
 * Function that validate the user password encrypted
 * @param password
 * @param cryptPassword
 */
const validatePassword = async ( password, cryptPassword ) => {
    return await compare( password, cryptPassword )
}

module.exports = {
    generatePasswordHash,
    validatePassword
}
