const express = require('express')
require('express-async-errors')
//所有的middleware都被tryCatch包裹起来了
const cors = require('cors')
const v1Router = require('./routes')

const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/v1', v1Router)

errorMiddleware(app)

module.exports = app