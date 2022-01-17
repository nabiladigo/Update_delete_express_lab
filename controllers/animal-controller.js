const express = require('express');
const router = express.Router();
const animals = require('../models/animal-model.js');

router.get('/', (req, res)=>{
    const allAnimals = animals.find();
    res.render('index.ejs', {animals: allAnimals});
});

router.post('/', (req, res)=>{
    animals.create(req.body, (error, createAnimal)=>{
        if(error) return console.log(error);
        console.log(createAnimal);
        res.redirect('/animals');
    });
});
router.get('/new', (req, res)=>{
    res.render('new.ejs');
});

router.get('/:animalId', (req, res)=>{
    animals.findById(req.params.animalId, (error, foundItem)=>{
        if(error){
            return console.log(error);
            return res.status(404).render('404.ejs', {error: error});
        };
        return res.render('show.ejs', {animal: foundItem});
    });
});

router.delete('/:animalId', (req, res)=>{
    animals.findByIdAndDelete(req.params.animalId, (error, deletedAnimal)=>{
        if(error){
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
        console.log(deletedAnimal);
        return res.redirect('/animals');
    });
});

 router.get('/:animalId/edit', (req, res)=>{
     animals.findById(req.params.animalId, (error, updatedanimal)=>{
         if(error){
             console.log(error);
             res.status(404).render('404.ejs', {error: error});
         }
         return res.render('edit.ejs', {animal: updatedanimal});
     });
 });

 router.put('/:animalId', (req, res)=>{
     animals.findByIdAndUpdate(req.params.animalId, req.body, (error, updatedanimal)=>{
        if(error){
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
        return res.redirect(`/animals/${updatedanimal.id}`);
     });
 });

 module.exports = router;