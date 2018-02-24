var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const path = require('path');  // permite manejar las rutas y las capertas direcciones dentro del servidor y el so
const mongoose = require('mongoose'); // permite conectarse a mongodb
const passport = require('passport'); // permite la autenticacion en el sistema
const flash = require('connect-flash'); //
const morgan = require('morgan'); // permite definir los metodos http que vienen del servidor y mostrarlos en consola
const cookieParser = require('cookie-parser'); // modulo para administrar las cookies
const bodyParser = require('body-parser'); // convierte el cuerpo de informacion
const session = require('express-session');//

const { url }  = require('./config/database');

mongoose.connect(url, function(err,res) {
  if(err)
    console.log('ERROR: conectando a la BD' + err);
  else
    console.log('conexion a la BD realizada');

  useMongoClient: true;
});

require('./config/passport')(passport); // configuiracion de passport
 // settings
app.set ('port', process.env.PORT|| 3000);
app.set('views', path.join(__dirname, 'views')); //indicar las vistas del proyecto unienod los paths de direccion de la carpeta
app.set('view engine', 'ejs'); // configura el motor de plantilla ejs

// middleware
app.use(morgan('dev')); // configura los mensajes por consola
app.use(cookieParser()); // convertir peticiones que lleguen al servidor
app.use(bodyParser.urlencoded({extended: false})); //// procesamiento de datos
app.use(bodyParser.json());
app.use(session({ // manejer session de express
  secret: 'marwiltutorialnode',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); // nos permite conectarnos
app.use(passport.session()); // informacion para no pedir la misma informacion cuando se autenticacion
app.use(flash()); // paso de mensajes entre paginas html

//routes
require('./app/routes')(app,passport); // confugarion de rutas

// static files
app.use(express.static(path.join(__dirname, 'public'))); //indica archivos estaticos




server.listen(app.get('port'), () => {
  console.log('servidor on port', app.get('port'));
});
