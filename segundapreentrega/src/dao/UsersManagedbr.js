import usersModel from "./models/users.model";

class UsersManager {
    get() {
        return usersModel.find();
    }
    static async getById(sid){
        const product = await usersModel.findById(sid);
        if(!product){
            throw new Error('Usuario no encontrado');
        }
        return product;
    }
    static async create(data){
        const newProduct = await usersModel.create(data);
        console.log(`Usuario creado: ${newProduct}`);
        return newProduct;
    }
    static async updateById(sid,data){
        await usersModel.updateOne({_id: sid}, {$set: data });
        console.log(`Usuario actualizado: ${sid}`);
    }
    static async deleteById(sid){
        await usersModel.deleteOne({_id: sid});
        console.log(`Usuario eliminado: ${sid}`)
    }
}