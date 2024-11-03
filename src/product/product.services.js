let { insertProduct, findProducts, findProductById, findProductByUserId, editProduct, deleteProduct } = require('./product.repository')
let { findUserByUserId } = require('../user/user.repository')

async function createProduct(newProductData, user_id) {
    
    let user = await findUserByUserId(user_id)
    let newProduct = await insertProduct(newProductData, user.category, user_id)
    return newProduct
}

async function getAllProducts() {

    let products = await findProducts()
    return products
}

async function getProductByUserId(user_id) {
    
    let products = await findProductByUserId(user_id)
    if(!products){
        throw Error('Product not found')
    }
    return products
}

async function getProductById(product_id, user_id) {

    let product = await findProductById(product_id)
    if (!product) {
        throw Error('Product not found')
    }
    
    if(product.user_id !== user_id){
        throw new Error('Invalid supplier')
    }
    return product 
}

async function editProductById(product_id, productData, user_id) {

    await getProductById(product_id, user_id)
    let user = await findUserByUserId(user_id)
    let updatedProduct = await editProduct(product_id, productData, user.category, user_id)
    return updatedProduct
}

async function deleteProductById(product_id, user_id) {
    await getProductById(product_id, user_id)
    await deleteProduct(product_id)
}

module.exports = {createProduct, getAllProducts, getProductById, getProductByUserId, editProductById, deleteProductById}