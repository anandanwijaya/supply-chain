let prisma = require('../db')

async function createOrder(product_id, user_id, quantity, total, category) {

    try {
        let newOrder = await prisma.order.create({
            data: {
                product_id: parseInt(product_id),
                user_id: parseInt(user_id),
                quantity,
                total,
                category,
                status: "PENDING"
            }
        })    
        return newOrder
    } catch (error) {
        throw new Error('Failed to create order')
    }
}

async function findOrders() {
    
    try {
        let orders = await prisma.order.findMany({
            include: {
                Master_Data: {
                    select: {
                        product_name: true
                    }
                }
            }
        })
        return orders
    } catch (error) {
        throw new Error('Failed to fetch order')
    }
}


async function findOrdersByUserId(user_id) {
    
    try {
        let orders = await prisma.order.findMany({
            where: {
                user_id: parseInt(user_id)
            },
            include: {
                Master_Data: {
                    select: {
                        product_name: true
                    }
                }
            }
        })
        return orders
    } catch (error) {
        throw new Error('Failed to fetch order by User Id')
    }
}

async function findOrderById(order_id) {
  
    let order = await prisma.order.findUnique({
        where: {
            order_id: parseInt(order_id)
        }
    })
    return order  
}

async function updateOrderId(order_id, product_id, user_id, quantity, total, category) {

    try { 
        let order = await prisma.order.update({
            where: {
                order_id: parseInt(order_id)
            },
            data: {
                product_id: parseInt(product_id),
                user_id: parseInt(user_id),
                quantity,
                total,
                category,
                status: "PENDING"
            }
        })
        return order
    } catch (error) {
        throw new Error('Failed to update order id')
    }
}

async function updateOrderStatus(order_id, status, timeStampField, user_id) {
    
    try {
        let updateData = {status}
        if(timeStampField){
            updateData[timeStampField] = new Date()
        }

        await prisma.order.update({
            where: {
                order_id: parseInt(order_id)
            },
            data: updateData
        })
    } catch (error) {
        throw new Error('Failed to update transaction status')
    }
}

module.exports = {createOrder, findOrders, findOrdersByUserId, findOrderById, updateOrderId , updateOrderStatus}