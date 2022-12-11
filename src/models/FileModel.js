const multer = require('multer');

console.log('Entrou no multer');

var storage = multer.diskStorage({
    filename : function(req,file,cb){
        let nome = file.originalname
        cb(null,nome)
    },
    destination: function(req,file,cb){
        let caminho = "./public/assets/imgs/alunos"
        cb(null,caminho)
    }
})

var upload = multer({storage})

module.exports = upload