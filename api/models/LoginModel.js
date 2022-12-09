const validator = require('validator');
const {openDb} = require('../db/configDB');

const multer = require('multer');
var storage = multer.diskStorage({
    filename: function(req,file,cb){
        let nome = file.originalname;
        cb(null,nome);
    },
    destination: function(req,file,cb){
        let path = "../../public/assets/imgs/alunos";
        cb(null,path);
    }
})

const util = require('util');
const fs = require('fs');
const path = require('path');
const copyFilePromise = util.promisify(fs.copyFile);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
        this.upload = multer({storage});
    }   

    async login(){
        this.validaCamposLogin();
        console.log(`Login: ${this.body.matricula} Senha: ${this.body.senha}`)
        let verificaLoginExiste = await this.listAluno(this.body.matricula,this.body.senha);
        if(!(verificaLoginExiste.length > 0)) this.errors.push('Usuario não existe.');

        if(this.errors.length > 0) return;
        this.user = await this.listAluno(this.body.matricula,this.body.senha);
    }

    async register(){
        this.validaCampos();
        if(this.errors.length > 0) return;
        try{
            //this.user = await insertAluno(this.body);
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
    }

    validaCamposLogin(){
        if(this.body.matricula == '' || this.body.matricula == '') this.errors.push('Matricula e Senha preicsam estar preenchidas.');
        if(isNaN(this.body.matricula)) this.errors.push('Somente números na matrícula.');
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
            file: this.body.file
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