const express = require("express")
const router = express()
const userController = require("../Contoller/UserController")

const tryCatchMiddleware = require("../Middleware/TryCatch")
const userVerifyToken = require("../Middleware/userAuth")

router
.post('/register', tryCatchMiddleware(userController.userRegister))
.post("/login", tryCatchMiddleware(userController.userLogin))

.use(userVerifyToken)

.get('/products', tryCatchMiddleware(userController.viewProduct))
.get('/products/:id', tryCatchMiddleware(userController.viewProductById))
.get('/products/category/:categoryname', tryCatchMiddleware(userController.viewProductsByCategory))

module.exports = router