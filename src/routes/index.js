const {Router} = require('express')
const authGuard = require('../middleware/authGuard')
const isTeacher = require('../middleware/isTeacher')
const courseRouter = require('./courses')
const studentRouter = require('./students')
const userRouter = require('./users')
const v1Router = Router()

v1Router.use('/students', authGuard, studentRouter)
v1Router.use('/courses', authGuard, isTeacher, courseRouter)
v1Router.use('/users', userRouter)

module.exports = v1Router