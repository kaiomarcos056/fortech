const Cadeira = require('../models/CadeiraModel');

exports.indexCadeira = async function (req,res){
    try{
        const cadeira  = new Cadeira(req.body);
        const listCad = await cadeira.listCadeiras(req.params.id);
        const idDisc = req.params.id;
        if(listCad){
            res.render('cadeiras', { listCad });
        }
    }catch(e){
        console.log(e);
    }
};

exports.resultCadeira = async function (req,res){
    try{
        const cadeira  = new Cadeira(req.body);
        const resultCad = await cadeira.resultCadeira(req.params.id);
        const listHistProfLimit = await cadeira.listHistProfLimit(req.params.id);
        if(resultCad){
            res.render('cadeiraResult', { resultCad, listHistProfLimit });
        }
    }catch(e){
        console.log(e);
    }
};