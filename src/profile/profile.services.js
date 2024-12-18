const { findProfileByUserId } = require('./profile.repository')

async function getProfileByUserId(user_id) {
    const user = await findProfileByUserId(user_id)
    if (!user) {
        throw Error('User not found')
    }
    return user
}

module.exports = { getProfileByUserId }
