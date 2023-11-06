import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import express from "express";
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import ProductManager from './ProductManager.js';
import http from 'http';
import { init } from './socket.js';

const PUERTO = 8080
const app = express()
const server = http.createServer(app);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "../public"))
app.use('/api', productsRouter, cartRouter)
app.use("/realtimeproducts", productsRouter)

app.engine("handlebars", engine())
app.set('views', `${__dirname}views`);
app.set("view engine", "handlebars")

app.get('/',async (req, res) => {
    const productManager = new ProductManager()
    const products = await productManager.getProducts();
    res.render('index', { title: 'G Store👙', products});
  });

app.get('/realtimeproducts',async (req, res) => {
  const productManager = new ProductManager()
  const products = await productManager.getProducts();
  res.render('realtimeproducts', { title: 'G Store👙', products});
  });

init(server)

server.listen(PUERTO, () => {
    console.log(`Servidor express activo en puerto ${PUERTO}`);
});

app.on('error', (error) => console.log(`Error en el servidor ${error}`));