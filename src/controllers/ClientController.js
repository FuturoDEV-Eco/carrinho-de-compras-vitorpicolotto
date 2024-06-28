const {Pool} = require('pg')

const conexaoPG = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'aramisRGB10!',
    database: 'api_carrinho_compras'
})

class ClientController{

    async criar(request, response){

        try {
            const dadosCliente = request.body
    
            if(!dadosCliente.nome || !dadosCliente.email || !dadosCliente.cpf || !dadosCliente.contact){
                return response.status(400).json({erro: 'Favor preencher todos os dados de cadastro!'})
            }

            const cliente = await conexaoPG.query(`
                INSERT INTO clients (nome, email, cpf, contact)
                values ($1, $2, $3, $4)
                `, [dadosCliente.nome, dadosCliente.email, dadosCliente.cpf, dadosCliente.contact]
            )

            response.status(201).json(cliente.rows[0])
        }
        catch (error) {
            response.status(500).json({mensagem: 'Não foi possível cadastrar o cliente! Tente novamente.'})
        }
    }

}


module.exports = new ClientController()