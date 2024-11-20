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
  console.log(req.body.nomeUser);
  console.log(req.body.sobrenomeUser);
  console.log(req.body.email);
  console.log(req.body.senha);
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
  

// Start server
let port = process.env.PORT || 3000;
app.listen(port,(req,res) => {
    console.log('Servidor rodando');
});
