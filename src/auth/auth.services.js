const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRepository = require('./auth.repository')

function generateToken(user) {
    return jwt.sign(
        {
            userId: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
}

async function register(username, email, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {
            username,
            email,
            password: hashedPassword,
        }
        const newUser = await userRepository.createUser(user)
        return newUser
    } catch (error) {
        throw new Error('Failed to register user')
    }
}

async function login(username, email, password) {
    const user = await userRepository.findUserByUsername(username)
    if (!user) {
        throw new Error('Invalid username or password')
    }

    const isValid =
        (await bcrypt.compare(password, user.password)) && email == user.email

    if (!isValid) {
        throw new Error('Invalid username, email or password')
    }

    const token = generateToken(user)
    return { user, token }
}

module.exports = { register, login }
