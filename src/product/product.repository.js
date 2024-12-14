const prisma = require('../db')

async function insertProduct(productData, category, user_id) {
    try {
        const newProduct = await prisma.master_Data.create({
            data: {
                product_name: productData.product_name,
                price: productData.price,
                category: category,
                user_id: parseInt(user_id),
            },
        })

        const newQuantity = await prisma.quantity.create({
            data: {
                quantity_of_product: productData.quantity,
                product_id: parseInt(newProduct.product_id),
            },
        })

        return newProduct
    } catch (error) {
        throw new Error('Failed to create product')
    }
}

async function findProducts() {
    try {
        const products = await prisma.master_Data.findMany({
            include: {
                Quantity: true,
                User: true,
            },
        })

        return products
    } catch (error) {
        throw new Error('Failed to find product')
    }
}

async function findProductByUserId(user_id) {
    try {
        const products = await prisma.master_Data.findMany({
            where: {
                user_id: parseInt(user_id),
            },
            include: {
                Quantity: true,
                User: true,
            },
        })

        return products
    } catch (error) {
        throw new Error('Failed to find product')
    }
}

async function findProductById(product_id) {
    try {
        const products = await prisma.master_Data.findUnique({
            where: {
                product_id: parseInt(product_id),
            },
            include: {
                Quantity: true,
                User: true,
            },
        })

        return products
    } catch (error) {
        throw new Error('Failed to find product')
    }
}

async function editProduct(product_id, productData, category, user_id) {
    try {
        const updatedProduct = await prisma.master_Data.update({
            where: {
                product_id: parseInt(product_id),
            },
            data: {
                product_name: productData.product_name,
                price: productData.price,
                category,
                user_id: parseInt(user_id),
            },
        })

        const updateQuantity = await prisma.quantity.update({
            where: {
                product_id: parseInt(product_id),
            },
            data: {
                quantity_of_product: productData.quantity,
            },
        })

        return updatedProduct
    } catch (error) {
        throw new Error('Failed to update product')
    }
}

async function deleteProduct(product_id) {
    try {
        await prisma.quantity.delete({
            where: {
                product_id: parseInt(product_id),
            },
        })
        await prisma.master_Data.delete({
            where: {
                product_id: parseInt(product_id),
            },
        })
    } catch (error) {
        throw new Error('Failed to delete product')
    }
}

async function findQuantityById(product_id) {
    try {
        const quantity = await prisma.quantity.findUnique({
            where: {
                product_id: parseInt(product_id),
            },
        })

        return quantity
    } catch (error) {
        throw new Error('Failed to delete quantity of product')
    }
}

async function updateProductQuantity(product_id, newQuantity) {
    try {
        await prisma.quantity.update({
            where: {
                product_id: parseInt(product_id),
            },
            data: {
                quantity_of_product: parseInt(newQuantity),
            },
        })
    } catch (error) {
        throw new Error('Failed to update quantity of product')
    }
}

module.exports = {
    insertProduct,
    findProducts,
    findProductById,
    findProductByUserId,
    editProduct,
    deleteProduct,
    updateProductQuantity,
    findQuantityById,
}
