let express = require('express')
let router = express.Router()
let userService = require('./profile.services')
let allUserAuthorization = require('../middleware/allUserAuthorization')

router.get('/', allUserAuthorization, async(req, res) => {

    try {
        let user_id = parseInt(req.user_id)
        let user = await userService.getProfileByUserId(user_id)
        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router