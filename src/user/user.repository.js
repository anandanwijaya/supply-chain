let prisma = require('../db')

async function insertUser(userData) {

    if(userData.role === 'STAKEHOLDER'){
        userData.category = ''
    }
    
    let newUser = await prisma.user.create({
        data: {
            username: userData.username, 
            email: userData.email, 
            password: userData.password,
            role: userData.role,
            category: userData.category
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
            category: true,
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
            category: true,
            created_at: true
        }
    })
    return user
}


async function editUser(user_id, userData) {

    if(userData.role === 'STAKEHOLDER'){
        userData.category = ''
    }
    
    let updatedUser = await prisma.user.update({
        where: {
            user_id: parseInt(user_id)
        },
        data: {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            category: userData.category
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