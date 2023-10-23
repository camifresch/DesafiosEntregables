const { Router } = require('express');
const { ProductManager } = require('../ProductManager.js')

const router = Router()
const manager = new ProductManager();
const getProducts = manager.getProducts();

router.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await getProducts);

    let allProducts = await getProducts;
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit);
});

router.get('/products/:id', async (req, res) => {
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

// router.post('/products', async (req, res) => {
//     const { body } = req;
//     const newProd = {
//       id: this.latestId.length + 1,
//       ...body,
//     };
//     manager.addProduct(newProd);
//     res.status(201).json(newProd);

// });

router.put("/:pid", async (req, res) =>{
    let id = req.params.pid
    let updateProduct = req.body
    res.send(await getProducts.updateProduct(id, updateProduct))
})
  
router.delete("/:pid", async (req, res) =>{
    let id = req.params.pid
    res.send(await getProducts.deleteProducts(id))
})

module.exports = router;