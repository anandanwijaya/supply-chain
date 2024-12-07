let express = require("express")
let router = express.Router()
let orderServices = require("./order.services")
let stakeholderAuthorization = require("../middleware/stakeholderAuthorization")
let supplierAuthorization = require("../middleware/supplierAuthorization")

router.post("/order", stakeholderAuthorization, async (req, res) => {
  try {
    let { product_id, quantity } = req.body
    let newOrder = await orderServices.createOrder(product_id, quantity)
    res.status(201).json(newOrder)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get("/", stakeholderAuthorization, async (req, res) => {
  try {
    let orders = await orderServices.getAllOrders()
    res.send(orders)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get("/order/:order_id", supplierAuthorization, async (req, res) => {
  try {
    let { order_id } = req.params
    let user_id = req.user_id
    let order = await orderServices.getOrdersById(order_id, user_id)
    res.send(order)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get("/user", supplierAuthorization, async (req, res) => {
  try {
    let user_id = req.user_id
    let orders = await orderServices.getOrdersByUserId(user_id)
    res.status(200).send(orders)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.patch("/updateorder/:order_id", stakeholderAuthorization, async (req, res) => {
  try {
    let { order_id } = req.params
    let { product_id, quantity } = req.body
    await orderServices.updateOrderById(order_id, product_id, quantity)
    res.status(200).json({ message: "Order update successfully" })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.patch("/verify/:order_id", supplierAuthorization, async (req, res) => {
  try {
    let { order_id } = req.params
    let { status } = req.body
    let user_id = req.user_id
    await orderServices.verifyOrder(order_id, status, user_id)
    res.status(200).json({ message: "Order verified successfully" })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.post("/reject/:order_id", supplierAuthorization, async (req, res) => {
  try {
    let { order_id } = req.params
    let user_id = req.user_id
    await orderServices.rejectOrder(order_id, user_id)
    res.status(200).json({ message: "Order Rejected" })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router