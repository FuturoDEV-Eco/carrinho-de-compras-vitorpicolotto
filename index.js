const express = require("express")
const app = express()
app.use(express.json()) //Obrigatório. Habilita o servidor


const clientRoutes = require('./src/routes/clients.routes')
app.use('/clients', clientRoutes)

const productRoutes = require('./src/routes/products.routes')
app.use('/products', productRoutes)

const pedidoRoutes = require('./src/routes/pedidos.routes')
app.use('/pedidos', pedidoRoutes)


app.listen(3000, ()=>{
    console.log('Servidor rodando')
})