const prisma = require('../db')

async function insertUser(userData) {
    try {
        if (userData.role === 'STAKEHOLDER') {
            userData.category = ''
        }

        const newUser = await prisma.user.create({
            data: {
                username: userData.username,
                email: userData.email,
                password: userData.password,
                role: userData.role.toUpperCase(),
                category: userData.category.toUpperCase(),
            },
        })

        return newUser
    } catch (error) {
        throw new Error('Failed to create user')
    }
}

async function findUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                user_id: true,
                username: true,
                email: true,
                role: true,
                category: true,
                created_at: true,
            },
        })

        return users
    } catch (error) {
        throw new Error('Failed to find users')
    }
}

async function findUserByUserId(user_id) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: parseInt(user_id),
            },
            select: {
                user_id: true,
                username: true,
                email: true,
                role: true,
                category: true,
                created_at: true,
            },
        })

        return user
    } catch (error) {
        throw new Error('Failed to find user')
    }
}

async function editUser(user_id, userData) {
    try {
        if (userData.role === 'STAKEHOLDER') {
            userData.category = ''
        }

        const updatedUser = await prisma.user.update({
            where: {
                user_id: parseInt(user_id),
            },
            data: {
                username: userData.username,
                email: userData.email,
                password: userData.password,
                role: userData.role.toUpperCase(),
                category: userData.category.toUpperCase(),
            },
        })

        return updatedUser
    } catch (error) {
        throw new Error('Failed to edit user')
    }
}

async function deleteUser(user_id) {
    try {
        await prisma.user.delete({
            where: {
                user_id: parseInt(user_id),
            },
        })
    } catch (error) {
        throw new Error('Failed to delete user')
    }
}

module.exports = {
    insertUser,
    findUsers,
    findUserByUserId,
    editUser,
    deleteUser,
}
