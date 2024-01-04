import { Router } from "express";
import productsModel from "../dao/models/products.model.js";

const indexRouter = Router()

indexRouter.get('/productsmdb', async (req, res) =>{
    const {limit = 10, page = 1, sort, search} = req.query;
    const criterials = {};
    const options = {limit,page};
    if (sort){
        options.sort = {price: sort}
    }
    if(search){
        criterials.category = search;
    }
    const products = await productsModel.paginate(criterials,options);
    res.status(200).json(products)
})

export default indexRouter