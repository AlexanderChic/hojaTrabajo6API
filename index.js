import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Arreglo temporal en memoria (sin base de datos)
const users = []

// ✅ Función para validar email
function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ✅ Función para validar contraseña
function passwordValido(password) {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)
}

// ✅ POST /users → Crear nuevo usuario
app.post('/users', (req, res) => {
  const { dpi, name, email, password } = req.body

  // Validar datos requeridos
  if (!dpi || !name || !email || !password) {
    return res.status(400).json({ message: 'Faltan datos requeridos' })
  }

  // Validar formato DPI (13 dígitos)
  if (!/^\d{13}$/.test(dpi)) {
    return res.status(400).json({ message: 'El DPI debe tener exactamente 13 dígitos numéricos' })
  }

  // Validar email
  if (!emailValido(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' })
  }

  // Validar contraseña
  if (!passwordValido(password)) {
    return res.status(400).json({
      message: 'El password debe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo'
    })
  }

  // Validar unicidad
  if (users.some(u => u.dpi === dpi)) {
    return res.status(409).json({ message: 'El DPI ya está registrado' })
  }
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ message: 'El email ya está registrado' })
  }

  // Crear usuario
  users.push({ dpi, name, email, password })
  return res.status(201).json({ message: 'Usuario creado correctamente' })
})

// ✅ GET /users → Listar usuarios con filtros
app.get('/users', (req, res) => {
  let result = users.map(u => ({
    dpi: u.dpi,
    name: u.name,
    email: u.email
  }))

  const { name, email, limit, offset } = req.query

  if (name) {
    result = result.filter(u => u.name.toLowerCase().includes(name.toLowerCase()))
  }

  if (email) {
    result = result.filter(u => u.email === email)
  }

  const start = offset ? parseInt(offset) : 0
  const end = limit ? start + parseInt(limit) : result.length

  return res.json(result.slice(start, end))
})

// ✅ PUT /users/:dpi → Actualizar usuario
app.put('/users/:dpi', (req, res) => {
  const dpi = req.params.dpi
  const { name, email, password, newDpi } = req.body

  const user = users.find(u => u.dpi === dpi)
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' })
  }

  // Validar nuevo DPI si intenta cambiarlo
  if (newDpi && newDpi !== dpi) {
    if (!/^\d{13}$/.test(newDpi)) {
      return res.status(400).json({ message: 'El nuevo DPI debe tener 13 dígitos numéricos' })
    }
    if (users.some(u => u.dpi === newDpi)) {
      return res.status(409).json({ message: 'El nuevo DPI ya está registrado en otro usuario' })
    }
    user.dpi = newDpi
  }

  // Validar email
  if (email && users.some(u => u.email === email && u.dpi !== dpi)) {
    return res.status(409).json({ message: 'El email ya está en uso por otro usuario' })
  }

  if (email && !emailValido(email)) {
    return res.status(400).json({ message: 'Formato de email inválido' })
  }

  // Validar contraseña si se cambia
  if (password && !passwordValido(password)) {
    return res.status(400).json({
      message: 'El password debe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo'
    })
  }

  // Actualizar datos
  if (name) user.name = name
  if (email) user.email = email
  if (password) user.password = password

  return res.json({ message: 'Usuario actualizado correctamente' })
})

// ✅ DELETE /users/:dpi → Eliminar usuario
app.delete('/users/:dpi', (req, res) => {
  const dpi = req.params.dpi
  const index = users.findIndex(u => u.dpi === dpi)
  if (index === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' })
  }

  users.splice(index, 1)
  return res.json({ message: 'Usuario eliminado correctamente' })
})

// ✅ Servidor en Render o local
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`)
})
