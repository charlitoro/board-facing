const assign = require('lodash/assign')
const { verify, sign } = require('jsonwebtoken')


/**
 *
 * @param token
 */
const verifyJwt = ( token ) => {
    try {
        return verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        console.error(err.message)
        return undefined
    }
}


/**
 *
 * @param payload
 * @param expiresIn
 */
const signJwt = ( payload, expiresIn = undefined ) => {
    return sign(
        payload,
        process.env.TOKEN_SECRET,
        assign({issuer: 'facing', algorithm: "HS256"}, { expiresIn: expiresIn ? expiresIn : '1d' } )
    )
}

module.exports = { verifyJwt, signJwt }
