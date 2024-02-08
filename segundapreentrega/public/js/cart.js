async function addProduct(productId){

    const quantity = 1;

    console.log(productId,quantity);

    const data = {

        productId,

        quantity:quantity

    };

    fetch('/api/carts', {

        method: 'POST',

        body: JSON.stringify(data),

        headers: {

            'Content-Type': 'application/json',

        },

    })

     .then((response) => {

     console.log(response);     

})     

 .catch((err) => {

        console.log(err);

 });

}