const validator = require('validator');
const {openDb} = require('../db/configDB');

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.errorsLogin = [];
        this.user = null;
    }   

    async login(){
        await this.validaCamposLogin();
        console.log(`Login: ${this.body.matricula} Senha: ${this.body.senha}`)

        if(this.errorsLogin.length > 0) return;
        this.user = await this.listAluno(this.body.matricula,this.body.senha);
    }

    async register(){
        this.validaCampos();
        if(this.errors.length > 0) return;
        try{
            await this.inserirAlno(this.body);
            console.log(this.body);
        }catch(e){
            console.log(e);
        }
    }

    async criaTableAluno(){
        openDb().then(db => {
            db.exec('CREATE TABLE IF NOT EXISTS aluno(id_aluno INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nome VARCHAR(255) NOT NULL,matricula VARCHAR(255) NOT NULL,email VARCHAR(255), senha VARCHAR(255),foto VARCHAR(200))') 
        })
    }

    async inserirAlno(aluno){
        openDb().then(db => {
            db.run('INSERT INTO aluno(nome,matricula,email,senha,foto) VALUES(?, ?, ?, ?, ?)', [aluno.nome, aluno.matricula, aluno.email, aluno.senha, `../assets/imgs/alunos/${aluno.file}`])
        });
    }

    validaCampos(){
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido.');
        if(this.body.senha !== this.body.confirmSenha) this.errors.push('As senhas precisam ser iguais.')
        if(this.body.senha.length < 8 || this.body.senha.length > 20){
            this.errors.push('A senha precisa ter entre 8 e 20 caracteres.');
        }
        if(isNaN(this.body.matricula)){
            this.errors.push('Somente números na matrícula.');
        }
        if(this.body.file === '' ) this.body.file = "perfil-vazio.jpg";
        if(this.body.termos !== 'checked') this.errors.push('Você precisa aceitar os termos de condição');
    }

    async validaCamposLogin(){
        if(this.body.matricula == '' || this.body.matricula == '') this.errorsLogin.push('Matricula e Senha precisam estar preenchidas.');
        if(isNaN(this.body.matricula)) this.errorsLogin.push('Somente números na matrícula.');

        let verificaLoginExiste = await this.listAluno(this.body.matricula,this.body.senha);
        if(verificaLoginExiste.length < 1) this.errorsLogin.push('Usuário não existe.');
    }


    cleanUp(){
        for(const key in this.body){
            if( typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {
            nome: this.body.nome,
            matricula: this.body.matricula,
            email: this.body.email,
            senha: this.body.senha,
            confirmSenha: this.body.confirmSenha,
            file: this.body.file,
            termos: this.body.termos
        }
    }
    
    async listAluno(matricula,senha){
        return openDb().then(db => {
            return db.all('SELECT * FROM aluno WHERE matricula = ? AND senha = ?', [matricula,senha] , (err, rows) => {
               if (err) return console.error('Deu erro aqui: ',err.message);
               rows.forEach(row => {
                   return console.log(row);
               });
           })
       })
    }


}

module.exports = Login;