const express = require('express')
const router = express.Router()
const userService = require('./profile.services')
const allUserAuthorization = require('../middleware/allUserAuthorization')

router.get('/', allUserAuthorization, async (req, res) => {
    try {
        const user_id = parseInt(req.user_id)
        const user = await userService.getProfileByUserId(user_id)
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/', allUserAuthorization, async (req, res) => {
    try {
        const user_id = parseInt(req.user_id)
        const userData = req.body
        const updatedUser = await userService.editProfile(user_id, userData)

        delete updatedUser.password
        res.status(200).send({
            data: updatedUser,
            message: 'Your profile succesfully updated!',
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router