import ProductManager from "./ProductManager.js"
import fs from "fs"

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./carts.json"
    }

    readCarts = async () => {
        let carts = fs.readFileSync(this.path, {encoding: 'utf-8'})
        return JSON.parse(carts);
    }

    writeCarts = async (carts) => {
       fs.writeFileSync(this.path, JSON.stringify(carts));
    }

    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.findIndex(cart => cart.id == id)
    }

    getCarts = async () => {
        try {
          const carts = await cartsModel.find().populate("products.pid");
          return !carts.length
            ? {
              status: 404,
              error: "No se encontraron carritos",
            }
            : carts;
        } catch (err) {
          return {
            status: 500,
            error: `Ocurrió un error al intentar obtener los carritos: ${err}`,
          };
        }
      }

    addCarts = async (newcart) => {
        try {
          const cart = await this.readCarts()
          await cart.push(newcart)
          this.writeCarts(cart)
          return newcart;
          } catch (err) {
            return {
              status: 500,
              error: `Ocurrió un error al intentar crear el carrito: ${err}`,
            };
          }
        }

    getCartsById = async (id) => {
        try {
          const cart = await this.readCarts()
          let cartById = await this.exist(id)
            return !cart[cartById]
              ? {
                status: 404,
                error: `No se encontró el carrito con ID [${id}]`,
              }
              : cart[cartById];
          } catch (err) {
            return {
              status: 500,
              error: `Ocurrió un error al intentar obtener el carrito con ID [${id}]: ${err}`,
            };
          }
        }

    addProductInCart = async (cartId, productId) =>{
        let cartById = await this.exist(cartId)
        if(cartById <0) return "Carrito no encontrado"
        const cart = await this.readCarts()
        let productById = await productAll.getProductById(productId)
        if(!productById) return "Producto no encontrado"
        
        let cartAll = await this.readCarts()
        if(cart[cartById].products.some(prod => prod.id == productId)) {
            let moreProductInCart = cart[cartById].products.find((prod) => prod.id == productId)
            moreProductInCart.cantidad++;
            await this.writeCarts(cart)
            return "Producto Sumado al Carrito"
        }

        cart[cartById].products.push({id: productById.id, cantidad: 1})

        await this.writeCarts(cart)
        return "Producto Agregado al Carrito"
    }
}

export default CartManager