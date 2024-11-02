let { findProfileByUserId } = require('./profile.repository')

async function getProfileByUserId(user_id) {
    
    let user = await findProfileByUserId(user_id)
    if(!user){
        throw Error('User not found')
    }
    if(user.user_id !== user_id){
        throw Error('Invalid User')
    }
    return user
}

module.exports = { getProfileByUserId }