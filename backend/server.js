const express = require('express')
const color = require('colors')
// const dotenv = require('dotenv').config()
require('dotenv').config({path:__dirname+'/.env'})

const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')


const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

app.use('/api/v1/goals', require('./routes/goalRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

