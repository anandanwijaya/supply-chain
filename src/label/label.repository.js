const prisma = require('../db')
const QRCode = require('qrcode')

async function createLabel(order, product) {
    const qrCode = await QRCode.toString(
        `https://supply-chain-frontend-seven.vercel.app/supplier/order/${order.order_id}`
    )
    try {
        const label = await prisma.label.create({
            data: {
                order_id: parseInt(order.order_id),
                user_id: parseInt(order.user_id),
                product_id: parseInt(order.product_id),
                description: `Product Name: ${product.product_name}, Quantity: ${order.quantity}, Total: ${order.total}, Take at: ${order.updated_at}`,
                qr_code: qrCode,
            },
        })
        return label
    } catch (error) {
        throw new Error('Failed to create label')
    }
}

async function findLabelByUserId(user_id) {
    try {
        const labels = await prisma.label.findMany({
            where: {
                user_id: parseInt(user_id),
            },
            include: {
                User: true,
                Master_Data: true,
                Order: true,
            },
        })

        for (const label of labels) {
            if (label.Order) {
                label.qr_code = await QRCode.toString(
                    `https://supply-chain-frontend-seven.vercel.app/supplier/order/${label.Order.order_id}`
                )
            }
        }

        return label
    } catch (error) {
        throw new Error('Failed to create label')
    }
}

async function findLabelById(label_id) {
    try {
        const label = await prisma.label.findUnique({
            where: {
                label_id: parseInt(label_id),
            },
            include: {
                User: true,
                Master_Data: true,
                Order: true,
            },
        })
        return label
    } catch (error) {
        throw new Error('Failed to create label')
    }
}

module.exports = { createLabel, findLabelByUserId, findLabelById }