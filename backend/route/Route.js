const express = require('express')
const { createRoute, getAllRoutes, deleteRoute,getSingle } = require('../controller/Route')

const Router = express.Router()


Router.get('/Create', createRoute)
Router.get('/', getAllRoutes)
Router.delete('/:id', deleteRoute)
Router.get('/:id', getSingle)

module.exports = Router