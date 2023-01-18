const express = require('express')
const { getAllProduct, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controller/productContoller')
const routes = express.Router()

routes.route("/product").get(getAllProduct)
routes.route("/product/new").post(createProduct)
routes.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getSingleProduct)

module.exports = routes