const mongoose = require('mongoose'); // conecction mongoose
//
const notifySchema = new mongoose.Schema({
  market : String,
  status : Boolean,
  date : String,
  updateDate: String,
  price : Number,
  sDate: String,
  profit: Number,
  sellP: Number
});

notifySchema.methods.enmascarar = function (){
  this.market = 'Premiun',
  this.status = 'Premiun',
  this.date = 'Premiun',
  this.price = 'Premiun',
  this.sDate = 'Premiun',
  this.profit = 'Premiun',
  this.sellP = 'Premiun'
};
module.exports = mongoose.model('notify', notifySchema);
