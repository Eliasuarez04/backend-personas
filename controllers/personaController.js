const Persona = require('../models/persona')

// Crear uno
exports.crearPersona = async (req, res) => {
  try {
    const nuevaPersona = new Persona(req.body)
    await nuevaPersona.save()
    res.status(201).json(nuevaPersona)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Leer todos
exports.obtenerPersonas = async (req, res) => {
  const personas = await Persona.find()
  res.json(personas)
}

// Leer uno
exports.obtenerPersonaPorId = async (req, res) => {
  const persona = await Persona.findById(req.params.id)
  if (!persona) return res.status(404).json({ mensaje: 'No encontrado' })
  res.json(persona)
}

// Actualizar uno
exports.actualizarPersona = async (req, res) => {
  const persona = await Persona.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(persona)
}

// Eliminar uno
exports.eliminarPersona = async (req, res) => {
  await Persona.findByIdAndDelete(req.params.id)
  res.json({ mensaje: 'Persona eliminada' })
}

// Eliminar masivamente
exports.eliminarMasivo = async (req, res) => {
  await Persona.deleteMany({})
  res.json({ mensaje: 'Todos los registros eliminados' })
}

// Insertar masivamente
exports.insertarMasivo = async (req, res) => {
  const personas = await Persona.insertMany(req.body)
  res.status(201).json(personas)
}
