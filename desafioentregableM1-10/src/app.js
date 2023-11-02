import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import express from "express";
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import ProductManager from './ProductManager.js';
import { randomNumber } from './utils.js';

const PUERTO = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "/public"))
app.use('/api', productsRouter, cartRouter)

app.engine("handlebars", engine())
app.set('views', `${__dirname}/views`);
app.set("view engine", "handlebars")

app.get('/', (req, res) => {
    const position = randomNumber(0, ProductManager.length - 1);
    const products = ProductManager[position];
    res.render('index', { title: 'G Store👙', ...products});
  });

app.listen(PUERTO, () => {
    console.log(`Servidor express activo en puerto ${PUERTO}`);
});

app.on('error', (error) => console.log(`Error en el servidor ${error}`));