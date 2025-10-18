const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

// Importar usuarios desde data/users.js
let users = require('../data/users');

// POST /users - Crear usuario (SIN protección)
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Nombre, email y password son requeridos' 
      });
    }

    // Verificar si el email ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        error: 'El email ya está registrado' 
      });
    }

    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword
    };

    users.push(newUser);
    
    // No devolver el password en la respuesta
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al crear usuario',
      details: error.message 
    });
  }
});

// GET /users - Listar usuarios (PROTEGIDO)
router.get('/', authenticateToken, (req, res) => {
  // No devolver los passwords
  const usersWithoutPasswords = users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  
  res.json(usersWithoutPasswords);
});

// GET /users/:id - Obtener usuario por ID (SIN protección)
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  // No devolver el password
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// PUT /users/:id - Actualizar usuario (PROTEGIDO)
router.put('/:id', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { name, email } = req.body;
  
  // Verificar si el nuevo email ya existe en otro usuario
  if (email && email !== user.email) {
    const emailExists = users.find(u => u.email === email && u.id !== user.id);
    if (emailExists) {
      return res.status(400).json({ 
        error: 'El email ya está en uso por otro usuario' 
      });
    }
  }

  if (name) user.name = name;
  if (email) user.email = email;

  // No devolver el password
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// DELETE /users/:id - Eliminar usuario (PROTEGIDO)
router.delete('/:id', authenticateToken, (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router;