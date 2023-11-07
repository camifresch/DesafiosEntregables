(function () {

const socket = io()

document
    .getElementById('form-products')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
      const thumbnail = document.getElementById('thumbnail').value;
      const code = document.getElementById('code').value;
      const stock = document.getElementById('stock').value;

      const newProduct = {
        title, 
        description,
        price,
        thumbnail,
        code,
        stock
      };
      console.log("newProduct", newProduct)
      socket.emit('new-product', newProduct);
      title=""
      description=""
      price=""
      thumbnail=""
      code=""
      stock=""
    });

  socket.on('product-list', (products) => {
    console.log('productos', products);
    const logProducts = document.getElementById('log-products');
    logProducts.innerText = '';
    products.forEach((prod) => {
      console.log("prod",prod)
      const p = document.createElement('p');
      p.innerText = `
      ${prod.title}
      ${prod.description}
      ${prod.price}
      ${prod.thumbnail}
      ${prod.code}
      ${prod.stock  }
      `
      logProducts.appendChild(p);
    });
  });


Swal.fire({
  title: 'Bienvenido, ingrese su nombre de usuario',
  input: 'text',
  allowOutsideClick: false,
  inputValidator:(value) => {
    if (!value) {
      return 'Ingrese su nombre de usuario para continuar.'
    }
  }
})
.then((result) => {
  username = result.value.trim();
  console.log('username', username);
})
.catch((error) => {
  console.error('Ha ocurrido un error:',  error.message);
});

})();