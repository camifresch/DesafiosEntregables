import CartManager from '../CartManager.js';
import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import cartsModel from '../dao/models/carts.model.js';

const cartRouter = Router()
const carts = new CartManager();

cartRouter.post('/carts', async (req, res, next) => {
try {
    const carrito = {
        products: [],
    };
 const respo = await carts.addCarts(carrito);
 res.json(respo)
} catch (error) {
    next(error)
}
})

cartRouter.get('/carts/:cid', async (req, res) => {
    const response = await carts.getCartsById(req.params.cid)
    res.send(response);
})

cartRouter.post("/carts/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const addResponse = await carts.addProductInCart(cid, pid);
  
    !addResponse.error
      ? res.send(addResponse)
      : res.status(addResponse.status).send(addResponse);
});

cartRouter.put("/carts/:cid/products", async (req, res) => {
    const cid = req.params.cid;
    const products = req.body;
    const updateResponse = await manager.updateProducts(cid, products);
  
    !updateResponse.error
      ? res.send(updateResponse)
      : res.status(updateResponse.status).send(updateResponse);
});
  
cartRouter.put("/carts/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const quantity = req.body;
    const updateResponse = await manager.updateQuantity(cid, pid, quantity);
  
    !updateResponse.error
      ? res.send(updateResponse)
      : res.status(updateResponse.status).send(updateResponse);
});
  
cartRouter.delete("/carts/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const deleteResponse = await manager.removeToCart(cid, pid);
  
    !deleteResponse.error
      ? res.send(deleteResponse)
      : res.status(deleteResponse.status).send(deleteResponse);
});
  
cartRouter.delete("/carts/:cid/products", async (req, res) => {
    const cid = req.params.cid;
    const deleteResponse = await manager.removeAllProductsToCart(cid);
  
    !deleteResponse.error
      ? res.send(deleteResponse)
      : res.status(deleteResponse.status).send(deleteResponse);
});


export default cartRouter