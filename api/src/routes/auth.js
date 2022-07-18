const {generatePasswordHash, validatePassword} = require("../utils/cryptPassword")

const { Router } = require('express')
const { User } = require('../models/Users')
const { signJwt, verifyJwt } = require('../utils/jwt')

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOneAndUpdate({email: email}, {
            token: signJwt({})
        }, {new: true})
        if ( !user ) {
            res.status(404).json({message: 'Invalid username and/or password'})
            return
        }
        if ( await validatePassword(password, user.password) === false) {
            res.status(401).json({message: 'Invalid username and/or password'})
            return
        }
        res.status(200).json({ data: {token: user.token} })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({message: "Something is wrong in login"})
    }
})


const userExist = async (email) => {
    const user = await User.findOne({ email: email })
    return !!user
}

authRouter.post('/signUp', async (req, res) => {
    const { name, email, password } = req.body
    if ( await userExist(email) ) {
        res.status(409).json({message: "E-mail already exists"})
        return
    }
    const passwordHash = await generatePasswordHash(password)
    const token = signJwt({})

    const user = await User.create({
        name, email, password: passwordHash, token
    })

    return res.status(201).json({token: user.token})
})

module.exports = authRouter
