import fs from "fs"


class ProductManager {
    constructor () {
        this.products = JSON.parse(fs.readFileSync('./productsList.json', 'utf-8'));
        this.latestId = JSON.parse(fs.readFileSync('./productsList.json', 'utf-8')).pop().id;;
        this.path = './productsList.json';
    }


    addProduct (title, description, price, code, stock, thumbnail) {
        if (!title || !description || !price || !code || !stock) {
            console.log("Error: todos los campos son obligatorios");
            return; 
        }

        const found = this.products.some(product => product.code === code);

        if (found) {
        
        console.log(`Error: Ya existe un producto con el código ${code}`);
        
        return;
        
        }

    const newproduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail? thumbnail: "",
        code: code,
        stock: stock,
        id: ++ this.latestId
    }

    this.products.push (newproduct);
    console.log("Producto agregado con éxito");
        fs.writeFileSync(this.path, JSON.stringify(this.products), (err) => {
            if (err) throw err;
            console.log('Archivo guardado con éxito');
        });
        return "Archivo guardado con exito"
        
    }


    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            console.log(products);
            return products;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async getProductById(productId) {
        const data = await fs.promises.readFile(this.path, 'utf-8'); 
        const productsById = JSON.parse(data);
        const product = productsById.find(product => product.id === productId);
        if (product) {
            console.log(product);
            return product;
        } else {
            console.log("Error: producto no encontrado");
        }
    } 

    async updateProduct (productId, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        
        const index = products.findIndex(product => product.id == productId);
        if (index === -1) {
            console.log('Error: producto no encontrado');
            return;
        }
        products[index] = {...products[index],...updateData};

        fs.writeFile(this.path, JSON.stringify(products), err => {
            if (err) throw err;
            console.log('Producto actualizado con éxito desde updateProduct')
        });
        return products[index]
    }

    async deleteProduct (deleteById){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);

        const deleteItemFilter = products.filter(product => product.id != deleteById);

        if (deleteItemFilter.length === products.length) {
            console.log('Error: No se encontró producto con ID ${deleteById}');
            return;
        }

        fs.writeFile(this.path, JSON.stringify(deleteItemFilter), err => {
            if (err) throw err;
            console.log('Producto borrado con éxito desde deleteProduct');
        });

        return {msg: "Producto borrado con exito desde deleteProduct"}
        
    }


}

export default ProductManager