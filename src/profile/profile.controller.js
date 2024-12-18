const express = require('express')
const router = express.Router()
const profileService = require('./profile.services')
const allUserAuthorization = require('../middleware/allUserAuthorization')

router.get('/', allUserAuthorization, async (req, res) => {
    try {
        const user_id = parseInt(req.user_id)
        const user = await profileService.getProfileByUserId(user_id)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/', allUserAuthorization, async (req, res) => {
    try {
        const user_id = parseInt(req.user_id)
        const userData = req.body
        const user = await profileService.editProfile(user_id, userData)
        delete user.password
        res.status(200).send({
            data: user,
            message: 'Your profile succesfully updated!',
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router