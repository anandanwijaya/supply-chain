const prisma = require('../db')

async function findProfileByUserId(user_id) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: parseInt(user_id),
            },
            select: {
                user_id: true,
                username: true,
                email: true,
                password: true,
                role: true,
                category: true,
                created_at: true,
            },
        })

        return user
    } catch (error) {
        throw new Error('Failed to find profile')
    }
}

async function updateProfile(user_id, userData) {
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

module.exports = { findProfileByUserId, updateProfile }