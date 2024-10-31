let prisma = require('../db')

async function insertProduct(productData, user_id) {

    let userCategory = await prisma.user.findUnique({
        where: {
            user_id: parseInt(user_id)
        }
    })

    let newProduct = await prisma.master_Data.create({
        data: {
            product_name: productData.product_name,
            price: productData.price,
            category: userCategory.category,
            user_id: parseInt(user_id)
        }
    })

    let newQuantity = await prisma.quantity.create({
        data: {
            quantity_of_product: productData.quantity,
            product_id: parseInt(newProduct.product_id)
        }
    })
    return newProduct
}

async function findProducts() {

    let products = await prisma.master_Data.findMany({
        include: {
            Quantity: {
                select: {
                    quantity_of_product: true
                }
            }
        }
    })
    return products
}

async function findProductById(product_id) {
    
    let products = await prisma.master_Data.findUnique({
        where: {
            product_id: parseInt(product_id)
        },
        include: {
            Quantity: {
                select: {
                    quantity_of_product: true
                }
            }
        }
    })
    return products
}

async function findProductByUserId(user_id) {
    
    let products = await prisma.master_Data.findMany({
        where: {
            user_id: parseInt(user_id)
        },
        include: {
            Quantity: {
                select: {
                    quantity_of_product: true
                }
            }
        }
    })
    return products
}

async function editProduct(product_id, productData, user_id) {
    
    let userCategory = await prisma.user.findUnique({
        where: {
            user_id: parseInt(user_id)
        }
    })

    let updatedProduct = await prisma.master_Data.update({
        where: {
            product_id: parseInt(product_id)
        }, 
        data: {
            product_name: productData.product_name,
            price: productData.price,
            category: userCategory.category,
            user_id: parseInt(user_id)
        }
    })

    let updateQuantity = await prisma.quantity.update({
        where: {
            product_id: parseInt(product_id)
        },
        data: {
            quantity_of_product: productData.quantity
        }
    })
    return updatedProduct
}

async function deleteProduct(product_id) {
    
    await prisma.quantity.delete({
        where: {
            product_id: parseInt(product_id)
        }
    })
    await prisma.master_Data.delete({
        where: {
            product_id: parseInt(product_id)
        }
    })
}

async function findQuantityById(product_id) {
    let quantity =  await prisma.quantity.findUnique({
        where: {
            product_id: parseInt(product_id)
        }
    })
    return quantity
}

async function updateProductQuantity(product_id, newQuantity) {
    await prisma.quantity.update({
        where: {
            product_id: parseInt(product_id)
        },
        data: {
            quantity_of_product: parseInt(newQuantity)
        }
    })
}
 

module.exports = {insertProduct, findProducts, findProductById, findProductByUserId, editProduct, deleteProduct, updateProductQuantity, findQuantityById}