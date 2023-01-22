const {Router} = require('express')
const courseRouter = require('./courses')
const studentRouter = require('./students')
const v1Router = Router()

v1Router.use('/students', studentRouter)
v1Router.use('/courses', courseRouter)

module.exports = v1Router