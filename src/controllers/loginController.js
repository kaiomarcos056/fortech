const Login = require('../models/LoginModel');

exports.indexCadastro = async (req,res) => {
    try{
        const aluno = new Login(req.body);
        await aluno.criaTableAluno();
        console.log(req.body)
        res.render('cadastro');
    }catch(e){
        console.log(e);
        res.render('404');
    }
};

exports.indexLogin = (req,res) => {  
    res.render('login');
};

exports.entrando = async function(req,res){
    try {
        const entra = new Login(req.body);

        await entra.login();
        
        if(entra.errorsLogin.length > 0){
            console.log('Erros #01: ',entra.errorsLogin)
            req.flash('errors', entra.errorsLogin);
            req.session.save(function() {
                return res.redirect('/login');
            });
            return;
        }
        req.session.user = entra.user;
        req.session.save(function() {
            return res.redirect('/');
        });
        return;
    }catch(e){
        console.log(e);
        res.render('404');
    }
};

exports.sair = function(req,res){
    req.session.destroy();
    res.redirect('/');
};

exports.register = async function(req,res){
    try {
        const login = new Login(req.body);
        await login.register();
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

