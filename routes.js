const express = require('express');
const route = express.Router();

const homeController = require('./api/controllers/homeController');
const loginController = require('./api/controllers/loginController');
const professorController = require('./api/controllers/professorController');
const cadeiraController = require('./api/controllers/cadeiraController');
const feedBackController = require('./api/controllers/feedBackController');

const { loginRequired } = require('./api/middlewares/middleware');

// Rotas da home
route.get('/', homeController.paginaInicial);

// Rotas de login/cadastro
route.get('/cadastro', loginController.indexCadastro);
route.post('/register', loginController.register);
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