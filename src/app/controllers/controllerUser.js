// controlador de la clase alert

module.exports = (app) =>{
  var User = require('../models/user');

  //metodo GET que trae las alertas al front end
  findAllUsers = function (req, res){
    User.find(function(err, users){
      if(!err)
        res.send(users);
      else
        console.log('ERROR:'+ err);
    });
  };

  // metodo Get que busca por id una alert
  findByID = function(req,res){
    User.findOne({ '_id': req.params.id}, function(err, user){
      if(!err)
        res.send(user);
      else
        console.log('ERROR:'+ err);
    });
  };
};
