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

// Rotas
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await models.Usuario.findOne({
      where: {
        email: email,
        senha: senha, // Idealmente, a senha deveria ser armazenada com hash e comparada com bcrypt.
      },
    });

    if (!user) {
      // Resposta para credenciais inválidas
      return res.status(401).json({ success: false, message: 'Email ou senha incorretos!' });
    }

    // Resposta para sucesso no login
    return res.json({
      success: true,
      message: 'Login realizado com sucesso!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        sobrenome: user.sobrenome,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
  }
});


  // Rota para atualizar a senha
  app.put('/verifyPass', async (req, res) => {
    let response=await models.Usuario.findOne({
      where:{
        id:req.body.id,
        senha:req.body.senhaAntiga
      }
    });
    console.log(req.body.id);
      console.log(req.body.senhaAntiga);
      console.log(req.body.novaSenha);
      console.log(req.body.confNovaSenha);
    if(response === null){
      //error:'Senha antiga não confere'
    }else{
      if(req.body.novaSenha === req.body.confNovaSenha){
        response.senha = req.body.novaSenha;
        response.save();
        //message:'Senha atualizada com sucesso!'
      }else{
        //console.error('Nova senha e confirmação não conferem!', error);
      }
    }
  });
  
    // Start server
    let port = process.env.PORT || 3000;
    app.listen(port,(req,res) => {
        console.log('Servidor rodando');
    });
