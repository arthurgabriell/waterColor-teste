//cod arthur gabriel
const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/db');
const estudante = require('./models/estudante.model');
const app = express();
//-----------------------------------------------------
const servidoresRouter = require('./routes/servidores.js');
app.use('/servidores', servidoresRouter);
//-----------------------------------------------------
const produtosRouter = require('./routes/produtos');
const path = require('path');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/produtos', produtosRouter);

app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');


//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------


app.get('/login', (req, res) => {
  res.render('loginEscolha');
});
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//Read
app.get('/', async (req, res) => {
  const estudantes = await estudante.findAll({ raw: true });

  res.render('listarEstudantes', { estudantes });
});

// abrir inicio create
app.get('/estudantes/create', (req, res) => {
  res.render('cadastrarEstudante');
});

app.get('/servidores/create', (req, res) => {
  res.render('cadastrarServidores');
});

//create
app.post('/estudantes', async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  const { nome, email, senha } = req.body;

  await estudante.create({
    nome,
    email,
    senha,
  });

  res.redirect('/');
});

//inicio de update
app.get('/estudantes/:id/edit', async (req, res) => {
  const id = req.params.id;

  const estudanteEncontrado = await estudante.findByPk(id, { raw: true });

  res.render('editarEstudante', { estudante: estudanteEncontrado });
});

//update
app.put('/estudante/:id', async (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;

  const estudanteEdit = await estudante.findByPk(id);

estudanteEdit.nome = nome;
estudanteEdit.email = req.body.email;
estudanteEdit.senha = req.body.senha;

await estudanteEdit.save();
});

//Delete

async function conectarBD() {
  try {
    await sequelize.authenticate();
    console.log('conexao com o Banco De Dados estabelecida com sucesso!');

    await sequelize.sync();
    console.log('Tabelas sincronizadas!');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}
conectarBD();

app.post('/estudantes/update', async (req, res) => {
  const id = req.body.id;
  const { nome, email, senha } = req.body;

  const estudanteEditar = await estudante.findByPk(id);

  estudanteEditar.nome = nome;
  estudanteEditar.email = email;
  estudanteEditar.senha = senha;

  await estudanteEditar.save();

  res.redirect('/');
});

app.post('/estudantes/delete', async (req, res) => {
  const id = req.body.id;

  await estudante.destroy({
    where: {
      id: id,
    },
  });

  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Servidor executando em http://localhost:3000');
});
