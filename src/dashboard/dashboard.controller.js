let express = require('express')
let router = express.Router()
let dashboardServices = require('./dashboard.services')
let stakeholderAuthorization = require('../middleware/stakeholderAuthorization')
let supplierAuthorization = require('../middleware/supplierAuthorization')

router.get('/stakeholder', stakeholderAuthorization, async(req, res) => {
    try {
        let dashboards = await dashboardServices.getAllDashboard()
        res.send(dashboards)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/user', supplierAuthorization, async(req, res) => {
    try {
        let user_id = req.user_id
        let dashboards = await dashboardServices.getAllDashboardByUserId(user_id)
        res.send(dashboards)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router