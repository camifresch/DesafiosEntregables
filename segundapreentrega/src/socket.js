import { Server } from "socket.io";
import ProductManager from './ProductManager.js';
import messageModel from "./dao/models/message.model.js";

export const init = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on('connection', async (socketClient) => {
        console.log(`Nuevo cliente socket conectado ${socketClient.id}🎊`)

        const productManager = new ProductManager()
        const products = await productManager.getProducts();
        socketClient.emit('product-list', products);

        socketClient.on('new-product', async (newProduct) => {
        const products = await productManager.getProducts();
        products.push(newProduct);
        socketClient.emit('product-list', products);
    });
    
    socketClient.on('clientMessage', async(message)=>{
      console.log("message", message);
      await messageModel.create(message);
      const messages = await messageModel.find({});
      console.log(messages);
      socketClient.emit('DBmessages', messages);
    })
    });
}

export const newproductFromAPI = (newProduct) => {
  products.push(newProduct);
  io.emit('update-products', products);
}
