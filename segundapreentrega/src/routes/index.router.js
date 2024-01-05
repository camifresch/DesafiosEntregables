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
    


const buildResponse = (prods) => {
    return {
        status: 'succes',
         payload: prods.docs.map((doc)=> doc.toJSON()),
         totalPages: prods.totalPages,
         prevPage: prods.prevPage,
         nextPage: prods.nextPage,
         page: prods.page,
         hasPrevPage: prods.hasPrevPage,
         hasNextPage: prods.hasNextPage,
         prevLink: prods.hasPrevPage ? `http://localhost:8080/api/products?limit=${prods.limit}&page=${prods.prevPages}`: null,
         nextLink: prods.hasNextPage ? `http://localhost:8080/api/products?limit=${prods.limit}&page=${prods.nextPage}`: null,
    }

}

    const data = buildResponse({...products,sort,search});
    console.log(data);
    res.render('productsmdb' ,{...data,title: 'integracion de DB'});

})

export default indexRouter