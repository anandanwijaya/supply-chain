const express = require('express')
const router = express.Router()
const supplierAuthorization = require('../middleware/supplierAuthorization')
const labelServices = require('./label.services')

router.get('/:id', supplierAuthorization, async (req, res) => {
    try {
        const { id } = req.params
        const label = await labelServices.getLabelById(id)
        res.status(200).send(label)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router
