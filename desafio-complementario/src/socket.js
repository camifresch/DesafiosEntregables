import { Server } from "socket.io";
import ProductManager from './ProductManager.js';


export const init = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on('connection', (socketClient) => {
        console.log(`Nuevo cliente socket conectado ${socketClient.id}🎊`)

        const productManager = new ProductManager()
        const products = productManager.getProducts();
        socketClient.emit('product-list', products);

        socketClient.on('new-product', (newProduct) => {
        products.push(newProduct);
        io.emit('update-products', products);
    });

    });
}

export const newproductFromAPI = (newProduct) => {
  products.push(newProduct);
  io.emit('update-products', products);
}