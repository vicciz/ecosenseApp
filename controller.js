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

  app.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params; // Extrai o ID do parâmetro da URL

    try {
        const result = await db.deleteUser(id); // Passa o ID para a função que deleta no banco

        if (result) {
            res.status(200).json({ status: 'success', message: 'Usuário deletado com sucesso!' });
        } else {
            res.status(404).json({ status: 'error', message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Erro ao deletar usuário.' });
    }
});
  // Rota para atualizar a senha
  router.put('/updatePassword/:id', async (req, res) => {
    const { id } = req.params; // ID do usuário na rota
    const { senha } = req.body; // Nova senha no corpo da requisição

    if (!senha) {
      return res.status(400).json({ error: 'A nova senha é obrigatória.' });
    }

    try {
      const user = await Usuario.findByPk(id); // Procura o usuário pelo ID
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Hash da nova senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      user.senha = hashedPassword; // Atualiza a senha
      await user.save(); // Salva as alterações no banco

      res.status(200).json({ message: 'Senha atualizada com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      res.status(500).json({ error: 'Erro interno ao atualizar senha.' });
    }
  });

  module.exports = router;

  
    // Start server
    let port = process.env.PORT || 3000;
    app.listen(port,(req,res) => {
        console.log('Servidor rodando');
    });
