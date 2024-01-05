import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import express from "express";
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';
import ProductManager from './ProductManager.js';
import http from 'http';
import { init } from './socket.js';
import { initDb } from './db/mongoDB.js';
import userRouter from './routes/users.router.js';
import chatRouter from './routes/chat.router.js';
import indexRouter from './routes/index.router.js';

const PUERTO = 8080
const app = express()
const server = http.createServer(app);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(__dirname + "../public"))
app.use('/api', productsRouter, cartRouter, userRouter, indexRouter)
app.use("/realtimeproducts", productsRouter)
app.use('/db', chatRouter);
app.use((error,req,res,next) => {
  const message = `error desconocido: ${error.message}`;
  console.error(message);
  res.status(500).json({message});
  next();
})

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

  app.get('/products',async (req, res) => {
    const productManager = new ProductManager()
    const products = await productManager.getProducts();
    res.render('products', { title: 'G Store👙', products});
    });

init(server)
await initDb()

server.listen(PUERTO, () => {
    console.log(`Servidor express activo en puerto ${PUERTO}`);
});

app.on('error', (error) => console.log(`Error en el servidor ${error}`));