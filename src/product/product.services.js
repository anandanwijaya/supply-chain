let { insertProduct, findProducts, findProductById, findProductByUserId, editProduct, deleteProduct } = require('./product.repository')

async function createProduct(newProductData, user_id) {
    
    let newProduct = await insertProduct(newProductData, user_id)
    return newProduct
}

async function getAllProducts() {

    let products = await findProducts()
    return products
}

async function getProductById(product_id) {

    let product = await findProductById(product_id)
    if (!product) {
        throw Error('Product not found')
    }
    return product
}

async function getProductByUserId(user_id) {
    
    let products = await findProductByUserId(user_id)
    if(!products){
        throw Error('Product not found')
    }
    return products
}

async function editProductById(product_id, productData) {

    await getProductById(product_id)
    let updatedProduct = await editProduct(product_id, productData)
    return updatedProduct
}

async function deleteProductById(product_id) {
    await getProductById(product_id)
    await deleteProduct(product_id)
}

module.exports = {createProduct, getAllProducts, getProductById, getProductByUserId, editProductById, deleteProductById}