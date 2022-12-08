const {openDb} = require('../db/configDB');

class Cadeira {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
        this.linhas = [];
    }

    async listCadeiras(id){
        return openDb().then(db => {
             return db.all('SELECT * FROM disciplina WHERE semestre=?', [id] , (err, rows) => {
                if (err) return console.error('Deu erro aqui: ',err.message);
                rows.forEach(row => {
                    return console.log(row);
                });
            })
        })
    }

    async resultCadeira(id){
        return openDb().then(db => {
             return db.all('SELECT * FROM disciplina WHERE id_disc=?', [id] , (err, rows) => {
                if (err) return console.error('Deu erro aqui: ',err.message);
                rows.forEach(row => {
                    return console.log(row);
                });
            })
        })
    }

    async listHistProfLimit(id){
        return openDb().then(db => {
             return db.all('SELECT hist.id_hist, hist.id_prof, hist.ano, prof.nome as nomeProf, prof.foto, prof.nota, disc.nome FROM historico as hist INNER JOIN professor as prof ON (prof.id_prof = hist.id_prof) INNER JOIN disciplina as disc ON (disc.id_disc = hist.id_disc) WHERE hist.id_disc = ?', [id] , (err, rows) => {
                if (err) return console.error('Deu erro aqui: ',err.message);
                rows.forEach(row => {
                    return console.log(row);
                });
            })
        })
    }

}

module.exports = Cadeira;