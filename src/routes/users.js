const { Router } = require('express')
const { register, login } = require('../controllers/users')

const userRouter = Router()

userRouter.post('', register)
//POST /users/login
//POST /auth  (跟authentication相关的login)
userRouter.post('/login', login)

module.exports = userRouter