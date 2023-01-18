const express = require('express')
const cors = require('cors')
const app = express()
const errMiddleware = require('./middleware/error')
app.use(express.json())
app.use(cors())

// import routes here
const productRoute = require('./routes/productRoute')
const userRoutes = require('./routes/userRoutes')
app.use("/api/v1", productRoute)
app.use('/api/v1', userRoutes)
app.use(errMiddleware)


module.exports = app