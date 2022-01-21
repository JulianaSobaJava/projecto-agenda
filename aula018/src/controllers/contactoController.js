const Contacto = require('../models/ContactoModel')

exports.index = (req, res) =>{
   return res.render('contacto',{contacto:{}});
};

exports.register = async (req, res) =>{
    try{
    const contacto = new Contacto(req.body);
    await contacto.register();

    if(contacto.errors.length > 0){
        req.flash('errors', contacto.errors);
        req.session.save(()=> res.redirect('back'));
        return;
    }
    req.flash('success', "Contacto registrado com sucesso");
    req.session.save(()=> res.redirect(`/contacto/index/${contacto.contacto._id}`));
    return;
   }catch(e){
       console.log(e);
       return res.render('404');
   }

};

exports.editIndex = async function(req, res){
    if(!req.params.id) return res.render('404');

    const contacto = await Contacto.buscaPorId(req.params.id);
    if(!contacto) return res.render('404');

    res.render('contacto',{contacto});
};

exports.edit = async function(req, res) {
    try {
      if(!req.params.id) return res.render('404');
      const contacto = new Contacto(req.body);
      await contacto.edit(req.params.id);
  
      if(contacto.errors.length > 0) {
        req.flash('errors', contacto.errors);
        req.session.save(() => res.redirect('back'));
        return;
      }
  
      req.flash('success', 'Contacto editado com sucesso.');
      req.session.save(() => res.redirect(`/contacto/index/${contacto.contacto._id}`));
      return;
    } catch(e) {
      console.log(e);
      res.render('404');
    }
  };
  
  exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404');
  
    const contacto = await Contacto.delete(req.params.id);
    if(!contacto) return res.render('404');
  
    req.flash('success', 'Contacto apagado com sucesso.');
    req.session.save(() => res.redirect('back'));
    return;
  };