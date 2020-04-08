require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const s3 =  new AWS.S3({
accessKeyId: "AKIA2GHNHVJZHMEUU54B",
secretAccessKey: "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"
});
console.log("Escritura y Lectura de S3");
var ObjetosGetObj = {
    Bucket: 'nodes3-demo',
    Key: 'imagen/nodes3.jpeg',
}
s3.getObject(ObjetosGetObj,(err,data) =>{
    if(err) throw err;
    console.log(data);
    fs.writeFile("Node.jpeg", data.Body,'binary',(err) =>{
        if(err) throw err;
        console.log("Imagen grabada al disco.");
    })
})
fs.readFile("texto.txt",(err,data) =>{
    if(err) throw err;
    var txtPutObject ={
        Bucket: 'nodes3-demo',
        Key: 'texto.txt',
        Body: data
    }
    s3.putObject(txtPutObject,(err,data) => {
        if(err) throw err;
        console.log(data);
    })
})
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
app.set('port', process.env.PORT || 9007);
app.set('host', process.env.MSQL_URL);
app.set('db_port', process.env.DB_PORT);
app.set('db_user', process.env.DB_USER);
app.set('db_contrasena', process.env.DB_PASSWORD);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Variable de entorno

//routes
app.get('/productos',(req,res) =>{
    res.json(productos)   
    console.log(`Host ${app.get('host')}`);
    console.log(`Puerto ${app.get('db_port')}`);
    console.log(`User ${app.get('db_user')}`);
    console.log(`Password ${app.get('db_contrasena')}`);

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