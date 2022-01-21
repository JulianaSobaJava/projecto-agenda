const Contacto = require('../models/ContactoModel')

exports.index =async (req, res)=>{
    const contactos = await Contacto.buscaContactos()
    res.render('index', {contactos});
};