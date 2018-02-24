const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs'); // para cifrar los passwords

const userSchema = new mongoose.Schema({ // datos de la base de datos
{
    email: { type: String, unique: true, lowercase: true },
    username: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    signupDate: { type: Date, default: Date.now() },
    lastDate: Date
    
  }
});

// metodo para cifrar clave de usuario
userSchema.methods.generateHash = function (password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// comparar contraseñas para ver si coinciden con la que esta en la bd
userSchema.methods.validatePassword = function (password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
