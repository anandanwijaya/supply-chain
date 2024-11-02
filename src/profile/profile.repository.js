let prisma = require('../db')

async function findProfileByUserId(user_id) {
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
}


module.exports = {findProfileByUserId}