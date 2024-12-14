const prisma = require('../db')

async function createOrder(product_id, user_id, quantity, total, category) {
    try {
        const newOrder = await prisma.order.create({
            data: {
                product_id: parseInt(product_id),
                user_id: parseInt(user_id),
                quantity,
                total,
                category,
                status: 'PENDING',
            },
        })
        return newOrder
    } catch (error) {
        throw new Error('Failed to create order')
    }
}

async function findOrders() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                Master_Data: true,
                User: true,
            },
        })
        return orders
    } catch (error) {
        throw new Error('Failed to fetch order')
    }
}

async function findOrdersByUserId(user_id) {
    try {
        const orders = await prisma.order.findMany({
            where: {
                user_id: parseInt(user_id),
            },
            include: {
                Master_Data: true,
                User: true,
            },
        })
        return orders
    } catch (error) {
        throw new Error('Failed to fetch order by User Id')
    }
}

async function findOrderById(order_id) {
    try {
        const order = await prisma.order.findUnique({
            where: {
                order_id: parseInt(order_id),
            },
            include: {
                Master_Data: true,
                User: true,
            },
        })
        return order
    } catch (error) {
        throw new Error('Failed to fetch order by Id')
    }
}

async function updateOrderId(order_id, product_id, user_id, quantity, total, category) {
    try {
        const order = await prisma.order.update({
            where: {
                order_id: parseInt(order_id),
            },
            data: {
                product_id: parseInt(product_id),
                user_id: parseInt(user_id),
                quantity,
                total,
                category,
                status: 'PENDING',
            },
        })
        return order
    } catch (error) {
        throw new Error('Failed to update order id')
    }
}

async function updateOrderStatus(order_id, status, timeStampField, user_id) {
    try {
        const updateData = { status }
        if (timeStampField) {
            updateData[timeStampField] = new Date()
        }

        await prisma.order.update({
            where: {
                order_id: parseInt(order_id),
            },
            data: updateData,
        })
    } catch (error) {
        throw new Error('Failed to update transaction status')
    }
}

module.exports = {
    createOrder,
    findOrders,
    findOrdersByUserId,
    findOrderById,
    updateOrderId,
    updateOrderStatus,
}
