const express = require('express');
const router = express.Router();
const products = require('../models/products-model.js');

router.get('/', (req, res)=>{
    const allProducts = products.find();
    res.render('index.ejs', {products: allProducts});
});
router.post('/', (req, res)=>{
    products.create(req.body, (error, createProduct)=>{
        if(error) return console.log(error);
        console.log(createProduct);
        res.redirect('/products');
    });
});
router.get('/new', (req, res)=>{
    res.render('new.ejs');
});

router.get('/:productId', (req, res)=>{
    products.findById(req.params.productId, (error, foundItem)=>{
        if(error){
            return console.log(error);
            return res.status(404).render('404.ejs', {error: error});
        };
        return res.render('show.ejs', {products: foundItem});
    });
});

router.delete('/:productId', (req, res)=>{
    products.findByIdAndDelete(req.params.productId, (error, deletedProduct)=>{
        if(error){
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
        console.log(deletedProduct);
        return res.redirect('/products');
    });
});
 router.get('/:productId/edit', (req, res)=>{
     products.findById(req.params.productId, (error, updatedProduct)=>{
         if(error){
             console.log(error);
             res.status(404).render('404.ejs', {error: error});
         }
         return res.render('edit.ejs', {product: updatedProduct});
     });
 });

 router.put('/:productId', (req, res)=>{
     products.findByIdAndUpdate(req.params.productId, req.body, (error, updatedProduct)=>{
        if(error){
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
        return res.redirect(`/products/${updatedProduct.id}`);
     });
 });

 module.exports = router;