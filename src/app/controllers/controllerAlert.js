// controlador de la clase alert

module.exports = (app) =>{
  var Notificacion = require('../models/alerta');

  //metodo GET que trae las alertas al front end
  findAllAlerts = function (req, res){
    Notificacion.find(function(err, alertas){
      if(!err)
        res.send(alertas);
      else
        console.log('ERROR:'+ err);
    });
  };

  // metodo GET que busca por id una alert
  findByID = function(req,res){
    Notificacion.findOne({'_id': req.params.id }, function(err, alert){
      if(!err)
        res.send(alert);
      else
        console.log('ERROR:'+ err);
    });
  };
};
