const mongoose = require('mongoose')

const Schema = mongoose.Schema

const favSchema = new Schema({
  stock: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Fav', favSchema)