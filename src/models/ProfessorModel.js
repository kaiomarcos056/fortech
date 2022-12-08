const {openDb} = require('../db/configDB');

class Professor {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
        this.linhas = [];
    }

    async createTable(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS professor(id_prof INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nome VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,descricao VARCHAR(255), curriculo VARCHAR(255),foto VARCHAR(200))') 
        })
    }
    
    async listProfessor(){
        return openDb().then(db => {
    
             return db.all('SELECT * FROM professor ORDER BY nome',[], (err, rows) => {
                if (err) return console.error(err.message);
                
                rows.forEach(row => {
                  return console.log(row);
                });
            })

         })
    }

    async listProfessorResult(id){
        return openDb().then(db => {
            return db.all('SELECT * FROM professor WHERE id_prof=?', [id] , (err, rows) => {
               if (err) return console.error('Deu erro aqui: ',err.message);
               rows.forEach(row => {
                   return console.log(row);
               });
           })
       })
    }

    async listProfessorResultPesquisa(nomeProf){
        return openDb().then(db => {
            return db.all("SELECT * FROM professor WHERE nome LIKE ?", ['%'+nomeProf+'%'] , (err, rows) => {
               if (err) return console.error('Deu erro aqui: ',err.message);
               rows.forEach(row => {
                   return console.log(row);
               });
           })
       })
    }

    async listDisciplinaResultPesquisa(nomeDisc){
        return openDb().then(db => {
            return db.all("SELECT * FROM disciplina WHERE nome LIKE ?", ['%'+nomeDisc+'%'] , (err, rows) => {
               if (err) return console.error('Deu erro aqui: ',err.message);
               rows.forEach(row => {
                   return console.log(row);
               });
           })
       })
    }

    async listFeedBackResult(id){
        return openDb().then(db => {
            return db.all('SELECT feedback.id_fb,feedback.id_prof,feedback.id_aluno,feedback.qualidade,feedback.nota,feedback.comentario,feedback.anonimo,feedback.av_pos,feedback.av_neg,professor.nome,aluno.nome,aluno.foto FROM feedback as feedback INNER JOIN professor as professor ON (professor.id_prof = feedback.id_prof) INNER JOIN aluno as aluno ON (aluno.id_aluno = feedback.id_aluno) WHERE feedback.id_prof = ? ORDER BY id_fb DESC', [id] , (err, rows) => {
               if (err) return console.error('Deu erro aqui: ',err.message);
               rows.forEach(row => {
                   return console.log(row);
               });
           })
       })
    }

    async listFeedBackResultLimitado(id){
        return openDb().then(db => {
            return db.all('SELECT feedback.id_fb,feedback.id_prof,feedback.id_aluno,feedback.qualidade,feedback.nota,feedback.comentario,feedback.anonimo,feedback.av_pos,feedback.av_neg,professor.nome,aluno.nome,aluno.foto FROM feedback as feedback INNER JOIN professor as professor ON (professor.id_prof = feedback.id_prof) INNER JOIN aluno as aluno ON (aluno.id_aluno = feedback.id_aluno) WHERE feedback.id_prof = ? ORDER BY id_fb DESC LIMIT 3', [id] , (err, rows) => {
               if (err) return console.error('Deu erro aqui: ',err.message);
               rows.forEach(row => {
                   return console.log(row);
               });
           })
       })
    }

    async retornaComentarios(id){
        return openDb().then(db => {
            return db.all('SELECT * FROM feedback where comentario is not "" and id_prof = ?', [id] , (err, rows) => {
               if (err) return console.error('Deu erro aqui: ',err.message);
               rows.forEach(row => {
                   return console.log(row);
               });
           })
       })
    }

    async listNotasFeedProf(id){
        return openDb().then(db => {
             return db.all('SELECT nota FROM feedback where id_prof=?',[id], (err, rows) => {
                if (err) return console.error(err.message);
                rows.forEach(row => {
                  return console.log(row);
                });
            })
         })
    }

}

module.exports = Professor;