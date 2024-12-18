const bcrypt = require('bcrypt')
const { findProfileByUserId, updateProfile } = require('./profile.repository')

async function getProfileByUserId(user_id) {
    const user = await findProfileByUserId(user_id)
    if (!user) {
        throw Error('User not found')
    }
    return user
}

async function editProfile(user_id, userData) {
    if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword
    }
    const user = await editUser(user_id, userData)
    return user
}

module.exports = { getProfileByUserId, editProfile }
