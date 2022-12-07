const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const professorController = require('./src/controllers/professorController');
const cadeiraController = require('./src/controllers/cadeiraController');
const feedBackController = require('./src/controllers/feedBackController');


// Rotas da home
route.get('/', homeController.paginaInicial);

// Rotas de login/cadastro
route.get('/cadastro', loginController.indexCadastro);
route.post('/register', loginController.register);
route.get('/login', loginController.indexLogin);
route.post('/logando', loginController.entrar);

// Rotas Professor
route.get('/professor', professorController.indexProfessor);
route.get('/professor/:id', professorController.indexProfessorResult);

// Rotas Feedback
route.get('/feedback/:id',feedBackController.indexFeedBackResult);
route.get('/feedbackRegister/:id',feedBackController.resultFeedBackResult);
route.post('/registerFeed/:id', feedBackController.registraFeedBack);

// Rotas Cadeiras
route.get('/cadeiras/:id', cadeiraController.indexCadeira);
route.get('/cadeiraResult/:id', cadeiraController.resultCadeira);

module.exports = route;