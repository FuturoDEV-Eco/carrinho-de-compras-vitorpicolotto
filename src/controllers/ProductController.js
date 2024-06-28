const {Pool} = require('pg')

const conexaoPG = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'aramisRGB10!',
    database: 'api_carrinho_compras'
})

class ProductController{

    async criar(request, response){
        try {
            const dadosProduto = request.body
    
            if(!dadosProduto.nome || !dadosProduto.amount || !dadosProduto.category_id){
                return response.status(400).json({erro: 'Favor preencher todos os dados do produto!'})
            }

            const produto = await conexaoPG.query(`
                INSERT INTO products (nome, amount, color, voltage, description, category_id)
                values ($1, $2, $3, $4, $5, $6)
                `, [dadosProduto.nome, dadosProduto.amount, dadosProduto.color, dadosProduto.voltage, dadosProduto.description, dadosProduto.category_id]
            )

            response.status(201).json(produto.rows[0])
        }
        catch (error) {
            response.status(500).json({mensagem: 'Não foi possível cadastrar o produto! Tente novamente.'})
        }
    }


    async listarTodos(request, response){
        const buscar = request.query
        const produtos = await conexaoPG.query(
            "SELECT * from products"
        )
        
        response.json(produtos.rows)
    }







    
}




module.exports = new ProductController()