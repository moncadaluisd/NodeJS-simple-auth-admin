const LocalStrategy = require('passport-local'). Strategy; // estrategia local de registro en la bd
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; // estrategia de registrocon google

const User = require('../app/models/user'); // modelo de usuario
const configAuth = require('./auth');

module.exports = function (passport){
  passport.serializeUser(function(user, done){ // transforma los datos en json
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done){  // obtiene los datos de un json
    User.findById(id, function (err, user){
      done(err,user);
    });
  });

  //signup
  passport.use('local-signup', new LocalStrategy({ // registro de usuario
    usernameField: 'email',
    passwordField: 'password',
      passReqToCallback: true
  },
  function (req, email, password, done){
    if (password!=req.body.rePassword) { // si las contraseñas no coinciden enviar mensaje de error
      return done(null, false, req.flash('signupMessage', 'password does not match'));
    }
    User.findOne({ 'local.email': email}, function (err, user){
      if(err) {return done(err);} // envia un mesaje de error
      if(user){
        // envia un masaje usuario ya existe
        return done(null, false, req.flash('signupMessage', 'The email is already exist'));
      }else{
        // crea un nuevo usuario
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.username = req.body.username;
        newUser.local.fullName = req.body.fullName;
        newUser.local.password = newUser.generateHash(password);
        newUser.local.rol = 'free';
        // guarda el isuario
        newUser.save(function(err){
          if(err){throw err;}
          return done(null, newUser);
        });
      }
    })
  }));

  //login
  passport.use('local-login', new LocalStrategy({ // ingreso de usuarios
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done){
    User.findOne({'local.email': email}, function (err,user){
      if(err) {return done(err);} // envia un mesaje de error
      if(!user){
        // envia un masaje usuario no encontrado
        return done(null, false, req.flash('loginMessage', 'not user found'));
      }
      if (!user.validatePassword(password)){
        // si la contraseña en incorrecta muestra el menssage de error
        return done(null, false, req.flash('loginMessge', 'wrong password'));
      }
      return done(null, user);
    })
  }));

  // resgistro con GoogleStrategy
  passport.use('google', new GoogleStrategy({ // ingreso de usuarios
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  },
  function (accessToken, refreshToken, profile, done){
    process.nextTick(function(){
      User.findOne({'google.id': profile.id}, function (err,user){
        if(err)
          return done(err); // envia un mesaje de error
        if(user)
          return done(null, user); // retorna el usuario encontrado
        else{
          // crea un nuevo usuario en la base de datos
          var newUser = new User();
          newUser.local.id = profile.id;
          newUser.local.token = accessToken;
          newUser.local.name = profile.displayName;
          newUser.local.email = profile.emails[0].value;

          newUser.save(function(err){
            if(err)
              throw err;
            return done(null,newUser);
          })
          console.log(profile);
        }
      });
    });
   }));
}
