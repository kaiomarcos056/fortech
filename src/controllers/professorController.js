const Professor = require('../models/ProfessorModel')

/*
exports.indexProfessor = (req,res) => {
    res.render('professorPesquisa');
};
*/

exports.indexProfessor = async function(req,res){
    try{
        const professor = new Professor(req.body);
        await professor.createTable();
        const listProf = await professor.listProfessor();
        const listFeedBacks = await professor.listFeedBackResult(req.params.id);
        if(listProf.length > 0){
            res.render('professorPesquisa', { listProf, listFeedBacks });
        }
        //res.render('professorPesquisa');
    }catch(e){
        console.log(e);
        res.render('404');
    }
}

exports.resultProfPesquisa = async function(req,res){
    try{
        const professor = new Professor(req.body);
        const listResultPesqProf = await professor.listProfessorResultPesquisa(req.body.nomeProf);
        const listResultPesqDisc = await professor.listDisciplinaResultPesquisa(req.body.nomeProf);

        console.log(listResultPesqProf);
        console.log(listResultPesqDisc);

        if(listResultPesqProf.length > 0 || listResultPesqDisc.length > 0 ){
           return res.render('professorResultPesquisa.ejs', { listResultPesqProf, listResultPesqDisc });
        }
        return res.render('professorResultPesquisa.ejs', { listResultPesqProf, listResultPesqDisc });
    }catch(e){
        console.log(e);
        res.render('404');
    }
}

exports.indexProfessorResult = async function(req,res){
    try{
        const professor = new Professor(req.body);
        const listProfResult = await professor.listProfessorResult(req.params.id);
        const listFeedBacks = await professor.listFeedBackResult(req.params.id);
        const listFeedBacksLimitados = await professor.listFeedBackResultLimitado(req.params.id);
        if(listProfResult){
            res.render('professorResult', { listProfResult, listFeedBacks, listFeedBacksLimitados });
        }
    }catch(e){
        console.log(e);
        res.render('404');
    }
}