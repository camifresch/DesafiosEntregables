import { Router } from "express";
import ProductManager from "../../dao/ProductManagerdb";

const productMong = Router()

productMong.get('/productsdb', async (req,res) => {
    const products = await ProductManager.get();
    res.status(200).json(products);
});

productMong.get('/productsdb/:sid', async (req,res) => {
    const {sid} = req.params;
    const products = await ProductManager.getById(sid);
    res.status(200).json(products);
});

productMong.post('/productsdb', async (req,res) => {
    const {body} = req;
    const products = await ProductManager.create(body);
    res.status(201).json(products);
});

productMong.put('/productsdb/:sid', async (req,res) => {
    const {sid} = req.params;
    const {body} = req;
    await ProductManager.updateById(sid,body);
    res.status(204).end();
});

productMong.put('/productsdb/:sid', async (req,res) => {
    const {sid} = req.params;
    await ProductManager.deleteById(sid);
    res.status(204).end();
});

export default productMong;