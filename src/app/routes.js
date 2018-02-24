const mUser = require('../app/models/user');
const mNotify = require('../app/models/alerta');
const url = 'http://localhost:3000/';

module.exports = (app, passport, bodyParser) =>{ // eporta la configuracion de la pagina index
  app.get('/', (req,res) => {
    res.render('indexw');
  });

// sale de la aplicacion


};

// verifica si esta logeado

