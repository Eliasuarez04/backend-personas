const mongoose = require('mongoose')

const personaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true }
})

module.exports = mongoose.model('Persona', personaSchema)
