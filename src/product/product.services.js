let { insertProduct, findProducts, findProductById, editProduct, deleteProduct } = require('./product.repository')

async function createProduct(newProductData) {
    
    let newProduct = await insertProduct(newProductData)
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

async function editProductById(product_id, productData) {

    await getProductById(product_id)
    let updatedProduct = await editProduct(product_id, productData)
    return updatedProduct
}

async function deleteProductById(product_id) {
    await getProductById(product_id)
    await deleteProduct(product_id)
}

module.exports = {createProduct, getAllProducts, getProductById, editProductById, deleteProductById}