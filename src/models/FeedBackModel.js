const {openDb} = require('../db/configDB');

class FeedBack{
    constructor(body,idProf){
        this.body = body;
        this.idProf = idProf;
        this.errors = [];
        this.user = null;
        this.linhas = [];
    }

    async register(){
        this.validaCampos();
        if(this.errors.length > 0) return;
        try{
            await this.inserirFeedBack(this.body,this.idProf);
            console.log(this.body);
        }catch(e){
            console.log(e);
        }
    }

    async listProfessores(){
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

    async inserirFeedBack(fed,id){
        openDb().then(db => {
            db.run('INSERT INTO feedback(id_prof,id_aluno,qualidade,nota,comentario,anonimo,av_pos,av_neg) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [id.replace(":",""), 1, fed.qualidades, fed.nota, fed.comentario, fed.anonimo,0,0])
        });
    }

    async listFeedBackResult(id){
        return openDb().then(db => {
            return db.all('SELECT feedback.id_fb,feedback.id_prof,feedback.id_aluno,feedback.qualidade,feedback.nota,feedback.comentario,feedback.anonimo,feedback.av_pos,feedback.av_neg,professor.nome,aluno.nome,aluno.foto FROM feedback as feedback INNER JOIN professor as professor ON (professor.id_prof = feedback.id_prof) INNER JOIN aluno as aluno ON (aluno.id_aluno = feedback.id_aluno) WHERE feedback.id_prof = ?', [id] , (err, rows) => {
               if (err) return console.error('Deu erro aqui: ',err.message);
               rows.forEach(row => {
                   return console.log(row);
               });
           })
       })
    }

    async listFeedBackComentarios(id){
        return openDb().then(db => {
            return db.all('SELECT feedback.id_fb,feedback.id_prof,feedback.id_aluno,feedback.qualidade,feedback.nota,feedback.comentario,feedback.anonimo,feedback.av_pos,feedback.av_neg,professor.nome,aluno.nome,aluno.foto FROM feedback as feedback INNER JOIN professor as professor ON (professor.id_prof = feedback.id_prof) INNER JOIN aluno as aluno ON (aluno.id_aluno = feedback.id_aluno) WHERE feedback.id_prof = ?', [id] , (err, rows) => {
               if (err) return console.error('Deu erro aqui: ',err.message);
               rows.forEach(row => {
                   return console.log(row);
               });
           })
       })
    }

    validaCampos(){
        this.cleanUp();
        //if(this.body.qualidades == null) this.errors.push('Preencha ao menos uma característica.');
        if(this.body.nota == null) this.errors.push('Dê uma nota para o(a) professor(a)');
        if(this.body.anonimo == null) this.body.anonimo = "false";
        if(this.body.comentario == '') this.body.comentario = "Sem comentário."
    }

    cleanUp(){
       /* for(const key in this.body){
            if( typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }*/
        this.body = {
            qualidades: this.body.qualidades,
            nota: this.body.nota,
            comentario: this.body.comentario,
            anonimo: this.body.anonimo  ,
        }
    }
}

module.exports = FeedBack;