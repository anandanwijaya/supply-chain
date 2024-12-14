const {
    insertProduct,
    findProducts,
    findProductById,
    findProductByUserId,
    editProduct,
    deleteProduct,
} = require('./product.repository')
const { findUserByUserId } = require('../user/user.repository')

async function createProduct(newProductData, user_id) {
    const user = await findUserByUserId(user_id)
    const newProduct = await insertProduct(
        newProductData,
        user.category,
        user_id
    )
    return newProduct
}

async function getAllProducts() {
    const products = await findProducts()
    return products
}

async function getProductByUserId(user_id) {
    const products = await findProductByUserId(user_id)
    if (!products) {
        throw Error('Product not found')
    }
    return products
}

async function getProductById(product_id, user_id) {
    const product = await findProductById(product_id)
    if (!product) {
        throw Error('Product not found')
    }

    if (product.user_id !== user_id) {
        throw new Error('Invalid supplier')
    }
    return product
}

async function editProductById(product_id, productData, user_id) {
    await getProductById(product_id, user_id)
    const user = await findUserByUserId(user_id)
    const updatedProduct = await editProduct(
        product_id,
        productData,
        user.category,
        user_id
    )
    return updatedProduct
}

async function deleteProductById(product_id, user_id) {
    await getProductById(product_id, user_id)
    await deleteProduct(product_id)
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByUserId,
    editProductById,
    deleteProductById,
}
