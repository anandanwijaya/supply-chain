let express = require("express")
let app = express()
let cors = require('cors')
let dotenv = require('dotenv')
let stakeholderAuthorization = require('./middleware/stakeholderAuthorization')
dotenv.config()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

let authController = require('./auth/auth.controller')
let productController = require('./product/product.controller')
let userController = require('./user/user.controller')
let orderController = require('./order/order.controller')
let profileController = require('./profile/profile.controller')
let dashboardController = require('./dashboard/dashboard.controller');

app.use('/api/auth', authController)
app.use('/api/products', productController)
app.use('/api/users', stakeholderAuthorization, userController)
app.use('/api/orders', orderController)
app.use('/api/profile', profileController)
app.use('/api/dashboard', dashboardController)


export default app