const orderRepository = require('./order.repository')
const productRepository = require('../product/product.repository')
const labelRepository = require('../label/label.repository')

async function createOrder(product_id, quantity) {
    const product = await productRepository.findProductById(product_id)
    if (!product) {
        throw new Error('Product not found')
    }
    const newOrder = await orderRepository.createOrder(
        product_id,
        product.user_id,
        quantity,
        parseInt(quantity) * parseInt(product.price),
        product.category
    )
    return newOrder
}

async function getAllOrders() {
    const orders = await orderRepository.findOrders()
    return orders
}

async function getOrdersByUserId(user_id) {
    const orders = await orderRepository.findOrdersByUserId(user_id)
    return orders
}

async function getOrdersById(order_id, user_id) {
    const order = await orderRepository.findOrderById(order_id)
    if (order.user_id !== user_id) {
        throw new Error('Invalid supplier')
    }
    return order
}

async function updateOrderById(order_id, product_id, quantity) {
    const product = await productRepository.findProductById(product_id)
    if (!product) {
        throw new Error('Product not found')
    }
    const order = await orderRepository.updateOrderId(
        order_id,
        product_id,
        product.user_id,
        quantity,
        parseInt(quantity) * parseInt(product.price),
        product.category
    )
    return order
}

async function verifyOrder(order_id, status, user_id) {
    const order = await orderRepository.findOrderById(order_id)
    if (!order) {
        throw new Error('Order not found')
    }

    if (order.user_id !== user_id) {
        throw new Error('Invalid supplier')
    }

    if (status === 'ON_PROCESS') {
        const order = await orderRepository.findOrderById(order_id)
        if (order.status !== 'PENDING') {
            throw new Error(
                'Cannot completed order. Order status is not PENDING'
            )
        }

        const quantity = await productRepository.findQuantityById(
            order.product_id
        )
        const newQuantity = quantity.quantity_of_product - order.quantity

        if (newQuantity < 0) {
            throw new Error('Insuficient quantity')
        }

        const product = await productRepository.findProductById(
            order.product_id
        )
        await orderRepository.updateOrderStatus(
            order_id,
            status,
            status === 'ON_PROCESS' ? 'updated_at' : null,
            user_id
        )
        await labelRepository.createLabel(order, product)

        const productQuantity = await productRepository.updateProductQuantity(
            quantity.product_id,
            newQuantity
        )
        return productQuantity
    } else if (status === 'DONE') {
        const order = await orderRepository.findOrderById(order_id)
        if (order.status !== 'ON_PROCESS') {
            throw new Error(
                'Cannot completed order. Order status is not ON_PROCESS'
            )
        }

        const orderDone = await orderRepository.updateOrderStatus(
            order_id,
            status,
            status === 'DONE' ? 'updated_at' : null,
            user_id
        )
        return orderDone
    } else {
        throw new Error('Order update failed')
    }
}

async function rejectOrder(order_id, user_id) {
    const order = await orderRepository.findOrderById(order_id)

    if (!order) {
        throw new Error('Order not found')
    }
    if (order.user_id !== user_id) {
        throw new Error('Invalid supplier')
    }
    if (order.status !== 'PENDING') {
        throw new Error('Cannot reject order. Order status is not Pending')
    }

    await orderRepository.updateOrderStatus(order_id, 'REJECT', 'updated_at')
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByUserId,
    getOrdersById,
    updateOrderById,
    verifyOrder,
    rejectOrder,
}
