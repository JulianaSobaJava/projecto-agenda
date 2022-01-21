const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    senha: {type: String, required: true},
    morada: {type: String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    async login(){
        this.valida()
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({email: this.body.email});

        if(!this.user) {
            this.errors.push('Usuário não existe.');
        return;
    }
        if(!bcryptjs.compareSync(this.body.senha, this.user.senha)){
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }
   async register(){
        this.valida();
        if(this.errors.length > 0) return;

      await this.userExists();
       
       if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
            this.user = await LoginModel.create(this.body);
    };

    async userExists(){
     this.user = await LoginModel.findOne({email: this.body.email});
     if(this.user) this.errors.push('Usuário já existe');
    }
    valida(){
        //validação
        this.cleanUp();
        //O email
        if(!validator.isEmail(this.body.email))this.errors.push('Email inválido');

        if(this.body.senha.length < 4 || this.body.senha.length >20){
           this.errors.push('A senha precisa  ter entre 4 e 20 caracteres');
        }
        if(this.body.morada === 'Angola')this.errors.push(`${this.body.morada} não é um endereço exacto`);  
    }
    cleanUp(){
        for(const key in this.body){
          if(typeof this.body[key] !== 'string'){
              this.body[key] = '';
          }
        }

        this.body = {
            email: this.body.email,
            senha: this.body.senha,
            morada: this.body.morada
        };
    }

};

module.exports = Login;