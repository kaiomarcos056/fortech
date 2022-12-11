const express = require('express');
const route = express.Router();
const upload = require('./src/models/FileModel');

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const professorController = require('./src/controllers/professorController');
const cadeiraController = require('./src/controllers/cadeiraController');
const feedBackController = require('./src/controllers/feedBackController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.paginaInicial);

// Rotas de login/cadastro
route.get('/cadastro', loginController.indexCadastro);
route.post('/register', upload.single("file"), loginController.register);
route.get('/login', loginController.indexLogin);
route.post('/entrando', loginController.entrando);
route.get('/logout',loginController.sair);

// Rotas Professor
route.get('/professor', loginRequired, professorController.indexProfessor);
route.get('/professor/:id', loginRequired, professorController.indexProfessorResult);
route.post('/professorPesquisa', loginRequired ,professorController.resultProfPesquisa);

// Rotas Feedback
route.get('/feedback/:id',loginRequired, feedBackController.indexFeedBackResult);
route.get('/feedbackRegister/:id', loginRequired, feedBackController.resultFeedBackResult);
route.post('/registerFeed/:id', loginRequired, feedBackController.registraFeedBack);

// Rotas Cadeiras
route.get('/cadeiras/:id', loginRequired, cadeiraController.indexCadeira);
route.get('/cadeiraResult/:id', loginRequired, cadeiraController.resultCadeira);

module.exports = route;