// Constants
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const models = require('./models'); // Caminho para a pasta onde está o index.js do Sequelize

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.post('/create',async(req, res) => {
    try {
      let reqs = await models.Usuario.create({
        'nome': req.body.nome,
        'sobrenome': req.body.sobrenome,
        'email': req.body.email,
        'senha': req.body.senha,
        'CreateAt': new Date(),
        'UpdateAt': new Date(),
      });
      if (reqs) {
        res.send(JSON.stringify('O usuário foi cadastrado com sucesso!'));
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  });

  // Routes
app.post('/login',async(req, res) => {
  try {
    let reqs = await models.Usuario.findOne({
      where:{
        'email':req.body.email,
        'senha': req.body.senha
      }
    }); 
    console.log(reqs);
    if (reqs === null) {
      res.send(JSON.stringify('Email ou senha incorreto!'));
    }else{
      res.send(JSON.stringify('Entrada efetuada com sucesso!!!'));
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

  // Rota para atualizar a senha
  app.put('/attsenha', async (req, res) => {
    let response=await models.Usuario.findOne({
      where:{
        id:req.body.id,
        senha:req.body.senhaAntiga
      }
    });
    if(response === null){
      res.send(JSON.stringfy('Senha antiga não confere'));
    }else{
      if(req.body.novaSenha === req.body.confNovaSenha){
        response.senha = req.body.novaSenha;
        response.save();
        res.send(JSON.stringfy('Senha atualizada com sucesso!'));
      }else{
        res.send(JSON.stringfy('Nova senha e confirmaçãonão conferem!'));
      }
    }
  });
  
    // Start server
    let port = process.env.PORT || 3000;
    app.listen(port,(req,res) => {
        console.log('Servidor rodando');
    });
