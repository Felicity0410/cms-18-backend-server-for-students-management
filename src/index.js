require('dotenv').config()

const express = require('express')
const cors = require('cors')
const v1Router = require('./routes')
const connectToDB = require('./utils/db')
const PORT = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(express.json())

app.use('/v1', v1Router)

connectToDB()

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
})