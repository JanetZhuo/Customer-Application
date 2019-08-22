const mongoose = require('mongoose');

const customerItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    require: true,
    trim: true
  },
  name: {
    type: String,
    require: true,
  },
  DOB: {
    type: String
  },
  email:{
    type: String,
    require: true,
  },
  phone: {
    type: Number
  },
})

const CustomerItem = mongoose.model('CustomerItem', customerItemSchema);

module.exports = { CustomerItem };