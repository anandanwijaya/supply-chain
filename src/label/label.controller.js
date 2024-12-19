const express = require('express')
const router = express.Router()
const stakeholderAuthorization = require('../middleware/stakeholderAuthorization')
const supplierAuthorization = require('../middleware/supplierAuthorization')
const labelServices = require('./label.services')

router.get('/', stakeholderAuthorization, async (req, res) => {
    try {
        const user_id = req.user_id
        const labels = await labelServices.getLabel(user_id)
        res.status(200).send(labels)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/user', supplierAuthorization, async (req, res) => {
    try {
        const user_id = req.user_id
        const labels = await labelServices.getLabelByUserId(user_id)
        res.status(200).send(labels)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router