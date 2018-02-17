const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(formatUser))
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        console.log(passwordHash)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            adult: body.adult
        })
        debugger
        const savedUser = await user.save()
        console.log(savedUser)
        response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

const formatUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        password: user.passwordHash,
        adult: user.adult,
        username: user.username
    }
}

module.exports = usersRouter

