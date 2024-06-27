const {Pool} = require('pg')

const conexaoPG = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'aramisRGB10!',
    database: 'api_carrinho_compras'
})

class ClientController{

}


module.exports = new ClientController()