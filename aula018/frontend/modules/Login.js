import validator from './validator';
export default class Login{
    constructor(formClass){
    this.form = document.querySelector(formClass);
    }

    init(){
    this.events();
    }
    events(){
        if(!this.form) return;
    this.form.addEventListener('submit',e=>{
        e.prevenDefault();
        this.validate();
    });
  }
  validate(e){
      const element = e.target;
      const emailInput = element.querySelector('input [name="email"]');
      const passwordInput = element.querySelector('input [name="password"]')
      let error = false;

      if(!validator.isEmail(emailInput)){
          alert('Please enter a valid email');
          error = true;
      }

      if(!passwordInput.value.length < 4 || passwordInput.value.length > 50){
        alert('Senha precisa estar entre 3 a 50 caracteres');
        error = true;
    }
    if(!error)element.submit();
  }
}