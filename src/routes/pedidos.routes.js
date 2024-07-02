const {Router} = require('express')
const PedidoController = require('../controllers/PedidoController')

const pedidoRoutes = new Router()

pedidoRoutes.post('/', PedidoController.criar)


module.exports = pedidoRoutes