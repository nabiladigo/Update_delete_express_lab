const express = require('express');
const  app = express();
const animalsController = require('./controllers/animal-controller.js');
const methodOverride = require('method-override');
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.static('puplic'));
app.use(methodOverride('_method'));
app.use('/animals', animalsController);

app.use((req, res, next)=>{
    next();
})

app.get('/', (req, res)=>{
    res.send('Hello world!')
})
app.get('/*', (req, res)=>{
    return res.status(404).render('404', {error: req.error});
});


app.listen(PORT,()=>{
    console.log(`I am listening on port${PORT}`);
});  



