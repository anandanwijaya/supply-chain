// let { item } = require('../db')
let orderRepository = require('./order.repository')
let productRepository = require('../product/product.repository')

async function createOrder(product_id, quantity, category) {
    let newOrder = await orderRepository.createOrder(product_id, quantity, category)
    return newOrder 
}

async function getAllOrders() {
    let orders = await orderRepository.findOrders()
    return orders
}

async function getOrdersByUserId(user_id) {
    let orders = await orderRepository.findOrdersByUserId(user_id)
    return orders
}

async function getOrdersById(order_id) {
    let order = await orderRepository.findOrderById(order_id)
    return order
}

async function updateOrderById(order_id, product_id, quantity) {
    let order = await orderRepository.updateOrderId(order_id, product_id, quantity)
    return order
}

async function verifyOrder(order_id, status, user_id) {
    let order = await orderRepository.findOrderById(order_id)
    if(!order){
        throw new Error('Order not found')
    }

    await orderRepository.updateOrderStatus(order_id, status, status === 'ON_PROCESS' ? 'updated_at' : null, user_id)
    await orderRepository.updateOrderStatus(order_id, status, status === 'COMPLETED' ? 'updated_at' : null, user_id)

    if(status === 'ON_PROCESS'){
        let product = await productRepository.findProductById(order.product_id)
        if(!product){
            throw new Error('Product not found')
        }
        let quantity = await productRepository.findQuantityById(order.product_id)
        let newQuantity = quantity.quantity_of_product - order.quantity
        if(newQuantity < 0){
            throw new Error('Insuficient quantity')
        }

        await productRepository.updateProductQuantity(quantity.product_id, newQuantity)
    } 
}

async function rejectOrder(order_id) {
    let order = await orderRepository.findOrderById(order_id)

    if(!order){
        throw new Error('Order not found')
    }
    if(order.status !== 'PENDING'){
        throw new Error('Cannot reject order. Order status is not Pending')
    }

    await orderRepository.updateOrderStatus(order_id, 'REJECT', 'updated_at')
}


module.exports = {createOrder, getAllOrders, getOrdersByUserId, getOrdersById, updateOrderById, verifyOrder, rejectOrder}