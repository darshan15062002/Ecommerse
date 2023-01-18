const express = require('express')
const { createUser, loginUser } = require('../controller/userController')
const routes = express.Router()

routes.route('/register').post(createUser)
routes.route('/login').post(loginUser)

module.exports = routes