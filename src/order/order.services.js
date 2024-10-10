// let { item } = require('../db')
let orderRepository = require('./order.repository')
let productRepository = require('../product/product.repository')

async function createOrder(user_id, product_id, quantity) {
    let newOrder = await orderRepository.createOrder(user_id, product_id, quantity)
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

async function verifyOrder(order_id, status) {
    let order = await orderRepository.findOrderById(order_id)
    if(!order){
        throw new Error('Order not found')
    }

    await orderRepository.updateOrderStatus(order_id, status, status === 'ON_PROCESS' ? 'updated_at' : null)

    if(status === 'ON_PROCESS'){
        let product = await productRepository.findProductById(order.product_id)
        if(!product){
            throw new Error('Product not found')
        }
        let quantity = await productRepository.findQuantityById(order.product_id)
        let newQuantity = quantity.number_of_product - order.quantity
        if(newQuantity < 0){
            throw new Error('Insuficient quantity')
        }

        await productRepository.updateProductQuantity(quantity.product_id, newQuantity)
    }
}

async function returnProduct(order_id) {
    let order = await orderRepository.findOrderById(order_id)
    
    if(!order){
        throw new Error('Order not found')
    }
    if(order.status !== 'ON_PROCESS'){
        throw new Error('Cannot return product. Order status is not On Process')
    }

    await orderRepository.updateOrderStatus(order_id, 'REJECT', 'updated_at')

    let quantity = await productRepository.findQuantityById(order.product_id)
    let newQuantity = quantity.number_of_product + order.quantity
    await productRepository.updateProductQuantity(quantity.product_id, newQuantity)
}


module.exports = {createOrder, getAllOrders, getOrdersByUserId, getOrdersById, verifyOrder, returnProduct}