// const prisma = require('../db')
const productRepository = require('../product/product.repository')
const orderRepository = require('../order/order.repository')

async function findDashboard() {
    const products = await productRepository.findProducts()
    const orders = await orderRepository.findOrders()
    return { products, orders }
}

async function findDashboardByUserId(user_id) {
    const products = await productRepository.findProductByUserId(user_id)
    const orders = await orderRepository.findOrdersByUserId(user_id)
    return { products, orders }
}

module.exports = { findDashboard, findDashboardByUserId }
