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

module.exports = router