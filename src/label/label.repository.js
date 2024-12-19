const prisma = require('../db')
const QRCode = require('qrcode')

async function createLabel(order, product) {
    const qrCode = await QRCode.toString(
        `https://supply-chain-frontend-seven.vercel.app/user/order`
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

async function findLabels() {
    try {
        const labels = await prisma.label.findMany({
            include: {
                User: true,
                Master_Data: true,
                Order: true,
            },
        })

        for (const label of labels) {
            label.qr_code = await QRCode.toString(`https://supply-chain-frontend-seven.vercel.app/user/order`)
        }

        return labels
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
            label.qr_code = await QRCode.toString(`https://supply-chain-frontend-seven.vercel.app/admin/order`)
        }

        return labels
    } catch (error) {
        throw new Error('Failed to create label')
    }
}


module.exports = { createLabel, findLabels, findLabelByUserId }