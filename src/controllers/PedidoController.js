const {Pool} = require('pg')

const conexaoPG = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'aramisRGB10!',
    database: 'api_carrinho_compras'
})


class PedidoController {

    async criar (request, response){
        
        try {
            
            const dados = request.body
    
            if (!dados.client_id || !dados.address || !dados.products){
                return response.status(400).json({erro: 'Dados incompletos!'})
            }
            
            let total = 0;
    
            for (let i = 0; i < dados.products.length; i++) {
                const item = dados.products[i];
                const produtoAtual = await conexaoPG.query(`
                    SELECT price FROM products 
                    WHERE id = $1
                `, [item.product_id]);
    
                total = total + (produtoAtual.rows[0].price * item.amount);
            }
      
            //inserir o pedido

            const meuPedido = await conexaoPG.query(`
                INSERT INTO orders (client_id, address, observations, total)
                values ($1, $2, $3, $4)
                RETURNING *
                `, [dados.client_id, dados.address, dados.observations, total]
            )
    
            //inserindo os itens do pedido

            dados.products.forEach(async item => {
                const produtoAtual = await conexaoPG.query(`
                    SELECT price from products
                    where id = $1
                    `, [item.product_id]
                )
    
                conexaoPG.query(`
                    INSERT INTO orders_items (order_id, product_id, amount, price)
                    values ($1, $2, $3, $4)
                    RETURNING *
                    `, [meuPedido.rows[0].id, item.product_id, item.amount, produtoAtual.rows[0].price]
                )
    
            })
    
            response.status(201).json({mensagem: "Pedido criado com sucesso!"})

        } catch (error) {
            response.status(500).json({erro: "Erro ao criar o pedido. Tente novamente!"})
        }
        
    }
}


module.exports = new PedidoController