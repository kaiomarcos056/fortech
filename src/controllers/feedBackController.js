const FeedBack = require('../models/FeedBackModel')

exports.registraFeedBack = async function(req,res){
    try {
        const feedback = new FeedBack(req.body,req.params.id);
        await feedback.register();
        const comentarios = await feedback.listFeedBackComentarios(req.params.id);
        console.log(comentarios.forEach( notas => {notas.nota}));

        if(feedback.errors.length > 0){
            console.log('Erros #01: ',feedback.errors)
            req.flash('errors', feedback.errors);
            req.session.save(function() {
                return res.redirect('/feedBackRegister/'+req.params.id.replace(":",""));
            });
            return;
        }
        req.flash('success', 'Seu feedBack foi cadastrado com sucesso.');
        req.session.save(function() {
            return res.redirect('/feedBackRegister/'+req.params.id.replace(":",""));
        });
        return;
    }catch(e){
        console.log(e);
        res.render('404');
    }
}

exports.indexFeedBackResult = async function(req,res){
    try{
        const feedBack = new FeedBack(req.body);
        const listFeedResult = await feedBack.listProfessorResult(req.params.id);
        const comentarios = await feedBack.listFeedBackComentarios(req.params.id);
        const listFeedBacks = await feedBack.listFeedBackResult(req.params.id);
        if(listFeedResult){
            res.render('feedBackPesquisa', { listFeedResult, comentarios, listFeedBacks });
        }
    }catch(e){
        console.log(e);
        res.render('404');
    }
};

exports.resultFeedBackResult = async function(req,res){
    try{
        const feedBack = new FeedBack(req.body);
        const listProfFeedResult = await feedBack.listProfessorResult(req.params.id);
        const listProfs = await feedBack.listProfessores(req.params.id);
        if(listProfFeedResult){
            res.render('feedBackRegister', { listProfFeedResult, listProfs });
        }
    }catch(e){
        console.log(e);
        res.render('404');
    }
};
