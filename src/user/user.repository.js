let prisma = require('../db')

async function insertUser(userData) {

    let newUser = await prisma.user.create({
        data: {
            username: userData.username, 
            email: userData.email, 
            password: userData.password
        }
    })
    return newUser
}

async function findUsers() {
   let users = await prisma.user.findMany({
        select: {
            user_id: true,
            username: true,
            email: true,
            role: true,
            created_at: true
        }
   }) 
   return users
}

async function findUserByUserId(user_id) {
    let user = await prisma.user.findUnique({
        where: {
            user_id: parseInt(user_id)
        },
        select: {
            user_id: true,
            username: true,
            email: true,
            role: true,
            created_at: true
        }
    })
    return user
}


async function editUser(user_id, userData) {
    let updatedUser = await prisma.user.update({
        where: {
            user_id: parseInt(user_id)
        },
        data: {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            role: userData.role,
        }
    })
    return updatedUser
}

async function deleteUser(user_id) {
    await prisma.user.delete({
        where: {
            user_id: parseInt(user_id)
        }
    }) 
}


module.exports = {insertUser, findUsers, findUserByUserId, editUser, deleteUser}