const express = require("express")
const app = express()
app.use(express.json()) //Obrigatório. Habilita o servidor


const clientRoutes = require('./src/routes/clients.routes')
app.use('/clients', clientRoutes)







app.listen(3000, ()=>{
    console.log('Servidor rodando')
})