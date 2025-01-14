const express = require('express')
const { getAllRoutes, deleteRoute,getSingle, createRouteExpanded } = require('../controller/Route')

const Router = express.Router()


// Router.post('/Create', createRouteBaseFunc)
Router.post('/Created', createRouteExpanded)
Router.get('/', getAllRoutes)
Router.delete('/:id', deleteRoute)
Router.get('/:id', getSingle)

module.exports = Router