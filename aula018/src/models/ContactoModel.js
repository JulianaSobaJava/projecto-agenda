const mongoose = require('mongoose');
const validator = require('validator');

const ContactoSchema = new mongoose.Schema({
    nome:{type: String, required: true},
    sobrenome:{type: String, required: false, default:''},
    email:{type: String, required: false, default:''},
    telefone:{type: String, required:false, default:''},
    criadoEm:{type: Date, default: Date.now}
});


const ContactoModel = mongoose.model('Contacto', ContactoSchema);

function Contacto(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contacto.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.contacto = await ContactoModel.create(this.body);
};

Contacto.prototype.valida = function() {
  this.cleanUp();

  // Validação
  // O e-mail precisa ser válido
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if(!this.body.email && !this.body.telefone) {
    this.errors.push('Pelo menos um contacto precisa ser enviado: e-mail ou telefone.');
  }
};

Contacto.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
};

Contacto.prototype.edit = async function(id) {
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;
        this.contacto = await ContactoModel.findByIdAndUpdate(id, this.body, { new: true });
      };


// Métodos estáticos
//São aqueles que não vão para o prototype, ou seja não acessam aos valores this.
Contacto.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const contacto = await ContactoModel.findById(id);
  return contacto;
};

Contacto.buscaContactos = async function(){
    const contactos = await ContactoModel.find()
      .sort({ criadoEm: -1 });
    return contactos;
  };
  
  Contacto.delete = async function(id){
    if(typeof id !== 'string') return;
    const contacto = await ContactoModel.findOneAndDelete({_id: id});
    return contacto;
  };
  
module.exports = Contacto;