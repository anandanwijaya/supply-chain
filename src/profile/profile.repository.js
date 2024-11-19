let prisma = require('../db')

async function findProfileByUserId(user_id) {

    try {
        let user = await prisma.user.findUnique({
            where: {
                user_id: parseInt(user_id)
            },
            select: {
                user_id: true,
                username: true,
                email: true,
                role: true,
                category: true,
                created_at: true
            }
        })
        
        return user
    } catch (error) {
        throw new Error('Failed to find profile')
    }
}


module.exports = {findProfileByUserId}