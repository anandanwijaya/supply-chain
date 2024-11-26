let express = require('express')
let router = express.Router()
let labelServices = require('./label.services')
let allUserAuthorization = require('../middleware/allUserAuthorization')

router.get('/:id', allUserAuthorization, async(req, res) => {
    try {
        let {id} = req.params
        let label = await labelServices.getLabelById(id)
        res.status(200).send(label)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;