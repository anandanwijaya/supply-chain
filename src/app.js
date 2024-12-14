const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const stakeholderAuthorization = require('./middleware/stakeholderAuthorization')
dotenv.config()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const authController = require('./auth/auth.controller')
const productController = require('./product/product.controller')
const userController = require('./user/user.controller')
const orderController = require('./order/order.controller')
const profileController = require('./profile/profile.controller')
const dashboardController = require('./dashboard/dashboard.controller')

app.use('/api/auth', authController)
app.use('/api/products', productController)
app.use('/api/users', stakeholderAuthorization, userController)
app.use('/api/orders', orderController)
app.use('/api/profile', profileController)
app.use('/api/dashboard', dashboardController)

export default app
