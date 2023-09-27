class ProductManager {
    constructor () {
    this.products = [];
    this.id = 0
    }

    getProduct() {
        return this.products
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
         this.products.push(newProduct)
            
        } else {
            console.error("El producto ingresado no es valido")
        }
        }

    validProduct(product) {
        return !this.products.find(pr => product.code === pr.code) && product.title && product.description && product.price && product.thumbnail && product.stock
    }

    generateId() {
        return this.products.length +1;
    }

    getProductById(id) {
        return this.products.find((product) =>{
            if (product.id === id) {
                return product
            } else {
                console.error('id no encontrado', id)
            }
        })
    }

}

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

productManager.addProduct({
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
})

allProducts = productManager.getProduct()

console.log('finding product by correct id:', productManager.getProductById(1))
productManager.getProductById(40)