let bcrypt = require('bcrypt')
let { insertUser, findUsers, findUserByUserId, editUser, deleteUser } = require('./user.repository')

async function createUser(newUserData) {

    let hashedPassword = await bcrypt.hash(newUserData.password, 10)

    newUserData.password = hashedPassword
    let newUser = await insertUser(newUserData)
    return newUser
}

async function getAllUsers() {
    let users = await findUsers()
    return users
}

async function getUserByUserId(user_id) {
    
    let user = await findUserByUserId(user_id)
    if(!user){
        throw Error('User not found')
    }
    return user
}

async function editUserByUserId(user_id, userData) {
    if(userData.password){
        let hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword
    }
    await getUserByUserId(user_id)
    let updatedUser = await editUser(user_id, userData)
    return updatedUser
}

async function deleteUserByUserId(user_id) {
    await getUserByUserId(user_id)
    await deleteUser(user_id)
}

module.exports = { createUser, getAllUsers, getUserByUserId, editUserByUserId, deleteUserByUserId }