import { Router } from 'express';
import ProductManager from '../ProductManager.js';


const productsRouter = Router()
const manager = new ProductManager();
const getProducts = manager.getProducts();

productsRouter.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await getProducts);

    let allProducts = await getProducts;
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit);
});

productsRouter.get('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await getProducts;
    let productById = allProducts.find(product => product.id === id);
    if (productById) {
        res.send(productById);
    } else {
        let error = {
            code: 'not_found',
            message: 'El producto con id ' + id + ' no existe'
        };
        res.status(404).send(error);
    }
});

productsRouter.post('/products', async (req, res) => {
    const { title, description, price, code, stock } = req.body;
    const newProd = manager.addProduct(title, description, price, code, stock);
    return res.status(201).json(newProd);

});

productsRouter.put("/:pid", async (req, res) =>{
    let id = req.params.pid
    let updateProduct = req.body
    const product= await manager.updateProduct(id, updateProduct)
    return res.json(product)
})
  
productsRouter.delete("/:pid", async (req, res) =>{
    let id = req.params.pid
    const respuesta = await manager.deleteProduct(id)
    return res.json(respuesta)
})

export default productsRouter