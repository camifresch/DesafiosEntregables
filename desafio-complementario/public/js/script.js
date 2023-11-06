(function () {

let username

const socket = io()

document
    .getElementById('form-products')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.getElementById('input');
      const newProduct = {
        username,             //aca no sabria que poner para que me actualice todos los campos del product
        body: input.value,
      };
      socket.emit('new-product', newProduct);
      input.value = '';
      input.focus();
    });

  socket.on('product-list', (products) => {
    console.log('productos', products);
    const logProducts = document.getElementById('log-products');
    logProducts.innerText = '';
    products.forEach((prod) => {
      const p = document.createElement('p');
      p.innerText = `${prod.body}`;  
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