let express = require('express')
let {createProduct, getAllProducts, getProductById, editProductById, deleteProductById} = require('./product.services');

let router = express.Router()

router.post('/', async(req, res) => {

    try {
        let newProductData = req.body
        let newProduct = await createProduct(newProductData)
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/', async(req, res) => {
    
    try {
        let products = await getAllProducts()
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:id', async(req, res) => {
    try {
        let productId = parseInt(req.params.id)
        let product = await getProductById(productId)
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', async(req, res) => {
    try {
        let productId = req.params.id
        let productData = req.body
        let updatedProduct = await editProductById(productId, productData)
        res.send(updatedProduct)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', async(req, res) => {
    try {
        let productId = req.params.id
        await deleteProductById(productId) 
        res.status(200).json({ message: 'Product Deleted' })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router