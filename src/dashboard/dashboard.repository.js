// let prisma = require('../db')
let productRepository = require('../product/product.repository')
let orderRepository = require('../order/order.repository')
 
async function findDashboard() {

    let products = await productRepository.findProducts()
    let orders = await orderRepository.findOrders()
    return {products, orders}
}
 
async function findDashboardByUserId(user_id) {

    let products = await productRepository.findProductByUserId(user_id)
    let orders = await orderRepository.findOrdersByUserId(user_id)
    return {products, orders}
}


module.exports = {findDashboard, findDashboardByUserId}