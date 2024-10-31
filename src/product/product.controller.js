let express = require('express')
let {createProduct, getAllProducts, getProductById, getProductByUserId, editProductById, deleteProductById} = require('./product.services')
let stakeholderAuthorization = require('../middleware/stakeholderAuthorization')
let authorizeJWT = require('../middleware/authorizeJWT')

let router = express.Router()

router.post('/', authorizeJWT, async(req, res) => {

    try {
        let user_id = req.user_id
        let newProductData = req.body
        let newProduct = await createProduct(newProductData, user_id)
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/', stakeholderAuthorization, async(req, res) => {
    
    try {
        let products = await getAllProducts()
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/user', authorizeJWT, async(req, res) => {
    try {
        let user_id = req.user_id
        let products = await getProductByUserId(user_id)
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:id', authorizeJWT, async(req, res) => {
    try {
        let productId = parseInt(req.params.id)
        let product = await getProductById(productId)
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', authorizeJWT, async(req, res) => {
    try {
        let user_id = req.user_id
        let productId = req.params.id
        let productData = req.body
        let updatedProduct = await editProductById(productId, productData, user_id)
        res.send(updatedProduct)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', authorizeJWT, async(req, res) => {
    try {
        let productId = req.params.id
        await deleteProductById(productId) 
        res.status(204).json({ message: 'Product Deleted' })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router