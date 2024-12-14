const express = require('express')
const router = express.Router()
const dashboardServices = require('./dashboard.services')
const stakeholderAuthorization = require('../middleware/stakeholderAuthorization')
const supplierAuthorization = require('../middleware/supplierAuthorization')

router.get('/stakeholder', stakeholderAuthorization, async (req, res) => {
    try {
        const dashboards = await dashboardServices.getAllDashboard()
        res.send(dashboards)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/user', supplierAuthorization, async (req, res) => {
    try {
        const user_id = req.user_id
        const dashboards = await dashboardServices.getAllDashboardByUserId(
            user_id
        )
        res.send(dashboards)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router
