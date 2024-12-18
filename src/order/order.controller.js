const express = require('express')
const router = express.Router()
const orderServices = require('./order.services')
const stakeholderAuthorization = require('../middleware/stakeholderAuthorization')
const supplierAuthorization = require('../middleware/supplierAuthorization')

router.post('/order', stakeholderAuthorization, async (req, res) => {
    try {
        const { product_id, quantity } = req.body
        const newOrder = await orderServices.createOrder(product_id, quantity)
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/', stakeholderAuthorization, async (req, res) => {
    try {
        const orders = await orderServices.getAllOrders()
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/order/:order_id', supplierAuthorization, async (req, res) => {
    try {
        const { order_id } = req.params
        const user_id = req.user_id
        const order = await orderServices.getOrdersById(order_id, user_id)
        res.status(200).send(order)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/user', supplierAuthorization, async (req, res) => {
    try {
        const user_id = req.user_id
        const orders = await orderServices.getOrdersByUserId(user_id)
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/updateorder/:order_id', stakeholderAuthorization, async (req, res) => {
    try {
        const { order_id } = req.params
        const { product_id, quantity } = req.body
        await orderServices.updateOrderById(order_id, product_id, quantity)
        res.status(200).json({ message: 'Order update successfully' })
    } catch (error) {
        res.status(400).send(error.message)
    }   
})

router.patch('/verify/:order_id', supplierAuthorization, async (req, res) => {
    try {
        const { order_id } = req.params
        const { status } = req.body
        const user_id = req.user_id
        await orderServices.verifyOrder(order_id, status, user_id)
        res.status(200).json({ message: 'Order verified successfully' })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/reject/:order_id', supplierAuthorization, async (req, res) => {
    try {
        const { order_id } = req.params
        const user_id = req.user_id
        await orderServices.rejectOrder(order_id, user_id)
        res.status(200).json({ message: 'Order Rejected' })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router
