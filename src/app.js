let express = require("express")
let app = express()
let dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT

let authController = require('./auth/auth.controller')
let productController = require('./product/product.controller')
let userController = require('./user/user.controller')
let orderController = require('./order/order.controller')
let stakeholderAuthorization = require('./middleware/stakeholderAuthorization')

app.use(express.json())
app.use('/api/auth', authController)
app.use('/api/products', productController)
app.use('/api/users', stakeholderAuthorization, userController)
app.use('/api/orders', orderController)

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})