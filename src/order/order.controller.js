let express = require('express')
let router = express.Router()
let orderServices = require('./order.services')

router.post('/order', async(req, res) => {

    try {
        let {product_id, user_id, quantity} = req.body
        let newOrder = await orderServices.createOrder(product_id, user_id, quantity)
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

 
router.get('/', async(req, res) => {
    
    try {
        let orders = await orderServices.getAllOrders()
        res.send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get('/user', async(req, res) => {

    let {user_id} = req.body
    try {
        let orders = await orderServices.getOrdersByUserId(user_id)
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch('/verify/:order_id', async(req, res) => {

    try {
        let {order_id} = req.params
        let {status} = req.body
        await orderServices.verifyOrder(order_id, status)
        res.status(200).json({message: 'Order verified successfully'})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/return/:order_id', async(req, res) => {

    try {
        let {order_id} = req.params
        let {user_id} = req.body

        let order = await orderServices.getOrdersById(order_id)
        if(order.user_id !== user_id){
            return res.status(403).json({message: 'Unauthorized'})
        }
 
        await orderServices.returnProduct(order_id)
        res.status(200).json({message: 'Product returned'})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router