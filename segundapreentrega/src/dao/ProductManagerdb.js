import productsModel from "./models/products.model";

export default class ProductManager {
    static get() {
        return productsModel.find()
    }
    static async getById(sid){
        const product = await productsModel.findById(sid);
        if(!product){
            throw new Error('Producto no encontrado');
        }
        return product;
    }
    static async create(data){
        const newProduct = await productsModel.create(data);
        console.log(`Prodcuto creado: ${newProduct}`);
        return newProduct;
    }
    static async updateById(sid,data){
        await productsModel.updateOne({_id: sid}, {$set: data });
        console.log(`Producto actualizado: ${sid}`);
    }
    static async deleteById(sid){
        await productsModel.deleteOne({_id: sid});
        console.log(`Producto eliminado: ${sid}`)
    }
}