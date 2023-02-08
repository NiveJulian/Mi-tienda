const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const products = [
    
        {
            id: 1, 
            nombre: "Anchoas",
            cantidad: 1,
            desc: "pizza",
            precio: 600,
            img: 'log/img/products/anchoas.jpg',
            stock: 3,
        },

        {
            id: 2, nombre: "Pizza de Carne",
            cantidad: 1,
            desc: "pizza",
            precio: 400,
            img: 'log/img/products/de_carne.jpg',
            stock: 3,
        },
        {
            id: 3,
            nombre: "Pizza de Colores",
            cantidad: 1,
            desc: "pizza",
            precio: 450,
            img: 'log/img/products/de_colores.jpg',
            stock: 3,
        },

        {
            id: 4,
            nombre: "Pizzeta individual de salmon y rucula",
            cantidad: 1,
            desc: "pizza",
            precio: 550,
            img: 'log/img/products/indv_de_salmon_rucula.jpg',
            stock: 3,
        },

        {
            id: 5,
            nombre: "Pizza Bacon con Champiñones",
            cantidad: 1,
            desc: "pizza",
            precio: 500,
            img: 'log/img/products/lacon_champiñones.jpg',
            stock: 3,
        },

        {
            id: 6,
            nombre: "Pizza con Pera, Jamon y Gorgonzola",
            cantidad: 1,
            desc: "pizza",
            precio: 550,
            img: 'log/img/products/pera_jamon_gorgonzola.jpg',
            stock: 3,
        },

        {
            id: 7,
            nombre: "Pizza con Pollo, Bacon y Champignones",
            cantidad: 1,
            desc: "pizza",
            precio: 450,
            img: 'log/img/products/pollo_bacon_champignones.jpg',
            stock: 3,
        },]


app.get('/api/products', (req, res) => {
    res.send(products)
})

app.post('/api/pay', (req, res) => {
    const ids = req.body;
    const procutsCopy = products.map(p => ({...p}));
    ids.forEach(id => {
        const product = procutsCopy.find(p => p.id === id);
        if(product.stock > 0){
            product.stock--;
        }else{
            throw "Sin Stock";
        }
    });
    products = procutsCopy;
    res.send(products);
});


app.use("/", express.static("fe"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
