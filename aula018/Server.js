 require('dotenv').config();
 const express = require('express');
 const app = express();
 const mongoose = require('mongoose');
  mongoose.connect(process.env.CONNECTIONSTRING)
.then(()=>{
     app.emit('pronto');
    })
.catch(e => console.log(e));


const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

 const routes = require('./routes');
 const path = require('path');
//  const helmet = require('helmet');
 const csrf = require('csurf');
 const {checkCsrfError, csrfMiddleware, meuMiddleWare} = require('./src/middleware/midleware')

 const port = process.env.PORT || 3000


 app.use(express.urlencoded({extended: true}));
 app.use(express.static(path.resolve(__dirname, 'public')));
//  app.use(helmet());

 const sessionOption = session({
     secret:'ashaushuahsua chbhdgh',
     strore: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
     resave: false,
     saveUninitialized: false,
     cookie:{
       maxAge:1000 * 60 * 60 * 24 * 7,
       httpOnly: true
     }
 });
 app.use(sessionOption);
 app.use(flash());

 app.set('views', path.resolve(__dirname, 'src', 'views'));
 app.set('view engine', 'ejs');

 
 app.use(csrf());

 //Nosso Próprio MiddleWare
 app.use(meuMiddleWare);
app.use(checkCsrfError);
app.use(csrfMiddleware);
 app.use(routes);

app.on( 'pronto', ()=>{
app.listen(port, ()=>{
    console.log('Aberto, na porta http://localhost:3000');
    console.log('Servidor sendo executado');
  });
});