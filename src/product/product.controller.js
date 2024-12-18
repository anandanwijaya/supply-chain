const express = require('express')
const {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByUserId,
    editProductById,
    deleteProductById,
} = require('./product.services')
const stakeholderAuthorization = require('../middleware/stakeholderAuthorization')
const supplierAuthorization = require('../middleware/supplierAuthorization')

const router = express.Router()

router.post('/', supplierAuthorization, async (req, res) => {
    try {
        const user_id = req.user_id
        const newProductData = req.body
        const newProduct = await createProduct(newProductData, user_id)
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/', stakeholderAuthorization, async (req, res) => {
    try {
        const products = await getAllProducts()
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/user', supplierAuthorization, async (req, res) => {
    try {
        const user_id = req.user_id
        const products = await getProductByUserId(user_id)
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:id', supplierAuthorization, async (req, res) => {
    try {
        const user_id = req.user_id
        const productId = parseInt(req.params.id)
        const product = await getProductById(productId, user_id)
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', supplierAuthorization, async (req, res) => {
    try {
        const user_id = req.user_id
        const productId = req.params.id
        const productData = req.body
        const updatedProduct = await editProductById(
            productId,
            productData,
            user_id
        )
        res.send(updatedProduct)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', supplierAuthorization, async (req, res) => {
    try {
        const user_id = req.user_id
        const productId = req.params.id
        await deleteProductById(productId, user_id)
        res.status(204).json({ message: 'Product Deleted' })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router
