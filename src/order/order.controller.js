let express = require('express')
let router = express.Router()
let orderServices = require('./order.services')
let stakeholderAuthorization = require('../middleware/stakeholderAuthorization')
let authorizeJWT = require('../middleware/authorizeJWT')
let allUserAuthorize = require('../middleware/allUserAuthorize')

router.post('/order', stakeholderAuthorization, async(req, res) => {

    try {
        let user_id = req.user_id
        let {product_id, quantity} = req.body
        let newOrder = await orderServices.createOrder(product_id, user_id, quantity)
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
 
router.get('/', allUserAuthorize, async(req, res) => {
    
    try {
        let orders = await orderServices.getAllOrders()
        res.send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/user', stakeholderAuthorization, async(req, res) => {

    let user_id = req.user_id
    try {
        let orders = await orderServices.getOrdersByUserId(user_id)
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/verify/:order_id', authorizeJWT, async(req, res) => {

    try {
        let {order_id} = req.params
        let {status} = req.body
        await orderServices.verifyOrder(order_id, status)
        res.status(200).json({message: 'Order verified successfully'})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/reject/:order_id', authorizeJWT, async(req, res) => {

    try {
        let {order_id} = req.params
        await orderServices.rejectOrder(order_id)
        res.status(200).json({message: 'Order Rejected'})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router