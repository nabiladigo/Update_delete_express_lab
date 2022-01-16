const express = require('express');
const  app = express();
const productsController = require('./controllers/products-controller.js');
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.static('puplic'));
app.use('/products', productsController);
app.use((req, res, next)=>{
    next();
})

app.get('/', (req, res)=>{
    res.send('Hello world!')
})
app.get('/*', (req, res)=>{
    const context = {error: req.error};
    return res.status(404).render('404', context);
});


app.listen(PORT,()=>{
    console.log(`I am listening on port${PORT}`);
});