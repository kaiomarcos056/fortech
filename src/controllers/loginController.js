const Login = require('../models/LoginModel');

exports.indexCadastro = async (req,res) => {
    try{
        const aluno = new Login(req.body);
        await aluno.criaTableAluno();
        //aluno.upload.single(req.body.file);
        res.render('cadastro');
    }catch(e){
        console.log(e);
        res.render('404');
    }
};

exports.indexLogin = (req,res) => {
    res.render('login');
};

exports.register = async function(req,res){
    try {
        const login = new Login(req.body);
        await login.register();
        await login.login();
        if(login.errors.length > 0){
            console.log('Erros #01: ',login.errors)
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/cadastro');
            });
            return;
        }
        req.flash('success', 'Seu usuário foi criado com sucesso.');
            req.session.save(function() {
                return res.redirect('/cadastro');
            });
            return;
    }catch(e){
        console.log(e);
        res.render('404');
    }
}; 

exports.entrar = async function(req,res){
    try {
        const login = new Login(req.body);
        await login.login();
        if(login.errors.length > 0){
            console.log('Erros #01: ',login.errors)
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/cadastro');
            });
            return;
        }
        req.flash('success', 'Seu usuário foi criado com sucesso.');
            req.session.save(function() {
                return res.redirect('/cadastro');
            });
            return;
    }catch(e){
        console.log(e);
        res.render('404');
    }
};