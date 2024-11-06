//Constants
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const model=require('./models');

let app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Routes
app.post('//create',async(req,res)=>{
    let reqs = await model.User.create({
        'nome':req.body.nomeUser,
        'senha':req.body.senhaUser,
        'email':req.body.emailUser,
        'createdAt':new Date(),
        'updatedAt':new Date()
        
    });
    console.log(req.body.nomeUser,req.body.emailUser,req.body.senhaeUser);
    if(reqs){
        res.send(JSON.stringify('O usuário foi cadastrado com sucesso!'));
    };

});

//start server
let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('servidor rodando');
});