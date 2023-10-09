const fs = require('fs');

class ProductManager {
    constructor () {
    this.products = [];
    this.id = 0;
    this.path = './productsList.JSON';
    }

    async getProduct() {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        console.log("File content: ", data);
    }

    addProduct(product) {
        if (this.validProduct(product)) {
            const newProduct = {
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                id: this.generateId()
        }
         const contenido = this.products.push(newProduct)
         fs.writeFile(this.path, JSON.stringify(this.products), (error) => {
            if(error) {
                console.log('Ocurrio un error durante la escritura:', error.message)
                } else {
                    console.log("Producto agregado con exito")
                    }
                })
                 } else {
                 console.error("El producto ingresado no es valido")
                }
            }

            validProduct(product) {

                const productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
                
                return !productos.find(producto => producto.code === product.code) && product.title && product.description && product.price && product.thumbnail && product.stock
                
                }

    generateId() {
        return this.products.length +1;
    }

    async getProductById(id) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const productById = JSON.parse(data)
        const productsId = productById.find(product => product.id === id)
            if (!productsId) {
                console.error('id no encontrado', id)
            } else {
                console.log(productsId);
                return productsId;
            }
        }

    async updateProduct(productId, field, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const product = JSON.parse(data);

        const index = product.findIndex(product => product.id === productId);
        if(!index) {
            console.log("Error: producto no encontrado")
        } else {
            product[index][field] = updateData;

            fs.writeFile(this.path, JSON.stringify(product), error => {
                if (error) throw error;
                console.log("Producto actualizado con exito")
            })
        }
    }

    async deleteProduct(deleteById) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const product = JSON.parse(data)

        const deleteProductFilter = product.filter(product => product.id !== deleteById);

        if (!deleteProductFilter) {
            console.log('Error: No se encontró producto con ID ${deleteById}');
            return;
        } else {
            fs.writeFile(this.path, JSON.stringify(deleteProductFilter), err => {
                if (err) throw err;
            console.log('Producto ${deleteById} borrado con éxito');
            })
        }
    }
}

// testing

let productManager = new ProductManager()

let allProducts = productManager.getProduct()
console.log(allProducts)

productManager.addProduct({
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
})

allProducts = productManager.getProduct()
console.log(allProducts)

console.log('finding product by correct id:', productManager.getProductById(1))
productManager.getProductById(40)

productManager.updateProduct(1, "description", 'La descripcion de este producto ha cambiado' )
productManager.deleteProduct(1)
