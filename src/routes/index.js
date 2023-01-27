const {Router} = require('express')
const courseRouter = require('./courses')
const studentRouter = require('./students')
const userRouter = require('./users')
const v1Router = Router()

v1Router.use('/students', studentRouter)
v1Router.use('/courses', courseRouter)
v1Router.use('/users', userRouter)

module.exports = v1Router