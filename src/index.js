require('dotenv').config();

const express = require ('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

//Database
const productos = [
    {
        id:1,
        name:'Laptop'
    },
    {
        id:2,
        name:'microphone'
    }
];

//Settings 
app.set('port', process.env.PORT || 9006);
//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Variable de entorno

//routes
app.get('/productos',(req,res) =>{
    res.json(productos)
});

app.post('/productos',(req,res) =>{
    //console.log(req.body);
    const {name} = req.body;
    productos.push({
        id: productos.length +1,
        name 
    });
    res.json('Satisfactoriamente creado');
});

app.put('/productos/:id',(req,res) => {
    //console.log(req.params,req.body);
    const {id} = req.params;
    const {name} = req.body;
    productos.forEach((productos,i) =>{
        if(productos.id == id){
            productos.name = name;
        }
    })
    res.json('Satisfactoriamente editado');
});

app.delete('/productos/:id', (req,res) =>{
    const {id} = req.params;
    productos.forEach((productos,i) =>{
        if(productos.id == id){
            productos.splice(i,1);
        }
    }); 
    res.json('Satisfactoriamente eliminado');
});

//static  files
app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), () => {
 console.log(`server on port ${app.get('port')}`);
});