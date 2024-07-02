const {Pool} = require('pg')

const conexaoPG = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'aramisRGB10!',
    database: 'api_carrinho_compras'
})

class ProductController{

    //POST para cadastrar o produto
    async criar(request, response){
        try {
            const dadosProduto = request.body
    
            if(!dadosProduto.nome || !dadosProduto.amount || !dadosProduto.category_id){
                return response.status(400).json({erro: 'Favor preencher todos os dados do produto!'})
            }

            const produto = await conexaoPG.query(`
                INSERT INTO products (nome, amount, color, voltage, description, category_id, price)
                values ($1, $2, $3, $4, $5, $6, $7)
                `, [dadosProduto.nome, dadosProduto.amount, dadosProduto.color, dadosProduto.voltage, dadosProduto.description, dadosProduto.category_id, dadosProduto.price]
            )

            response.status(201).json(produto.rows[0])
        }
        catch (error) {
            response.status(500).json({mensagem: 'Não foi possível cadastrar o produto! Tente novamente.'})
        }
    }

    //Método GET para todos os produtos
    async listarTodos(request, response){
        const buscar = request.query
        const produtos = await conexaoPG.query(
            "SELECT * from products"
        )
        
        response.json(produtos.rows)
    }

    //Método GET para apenas um produto
    async listarUm(request, response){

        try {
            const id = request.params.id

            const produtoDetalhe = await conexaoPG.query(`
                p.id AS product_id, p.name AS product_name,
                c.id AS category_id, c.name AS category_name,
                p.amount, p.color, p.voltage, p.description, p.price
                FROM products p JOIN categories c ON p.category_id = c.id
                WHERE p.id = $1           
                `, [id]
            )
 
            if(produtoDetalhe.rowCount === 0){
                return response.status(404).json({mensagem: 'Produto não encontrado!'})
            }

            response.json(produtoDetalhe.rows[0])

        } catch (error) {
            response.status(500).json({erro: 'Erro ao listar produto!'})
        }
    }

    //Adicionar outras funcionalidades aqui.
}




module.exports = new ProductController()