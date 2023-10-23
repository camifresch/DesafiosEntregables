const {ProductManager} = require('./ProductManager.js')
const express = require('express');
const userRouter = require('./routes/users.router.js')
const productsRouter = require('./routes/products.router.js')

const PUERTO = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', userRouter, productsRouter)

app.listen(PUERTO, () => {
    console.log(`Servidor express activo en puerto ${PUERTO}`);
});

app.on('error', (error) => console.log(`Error en el servidor ${error}`));