const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consultaSchema = new Schema({
  username: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
});


module.exports = mongoose.model('Consulta', consultaSchema);
