let prisma = require('../db')

async function createUser(userData) {
    
    try {
        let newUser = await prisma.user.create({ data: userData })
        return newUser
    } catch (error) {
        throw new Error('Failed to create user in repository')
    }
}

async function findUserByUsername(username) {
    try {
        return prisma.user.findUnique({ where: { username } })
    } catch (error) {
        throw new Error('Failed to find user')
    }
}

module.exports = {createUser, findUserByUsername}