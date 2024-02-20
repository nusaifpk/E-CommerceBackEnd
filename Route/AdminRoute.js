const express = require("express")
const router = express.Router();
const adminContoller = require("../Contoller/AdminContoller")

const tryCatchMiddleware = require("../Middleware/TryCatch")
const adminVerifyToken = require("../Middleware/adminAuth")

router
.post('/login', tryCatchMiddleware (adminContoller.adminLogin))

.use(adminVerifyToken)

.get('/users', tryCatchMiddleware (adminContoller.viewUsers))
.get('/users/:id', tryCatchMiddleware (adminContoller.viewUserById))
.get('/addproduct', tryCatchMiddleware (adminContoller.addProducts))

module.exports = router