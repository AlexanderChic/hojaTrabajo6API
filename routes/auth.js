const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Importar usuarios desde data/users.js
const users = require('../data/users');

// POST /login - Autenticar usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('📧 Intentando login con:', email); // Debug

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email y password son requeridos' 
      });
    }

    // Buscar usuario en data/users.js
    const user = users.find(u => u.email === email);
    if (!user) {
      console.log('❌ Usuario no encontrado');
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    // Verificar password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('❌ Contraseña incorrecta');
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    console.log('✅ Login exitoso');

    // Crear token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        name: user.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '30s' }
    );

    res.json({
      message: 'Login exitoso',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      expiresIn: '30 segundos'
    });

  } catch (error) {
    console.error('💥 Error en login:', error);
    res.status(500).json({ 
      error: 'Error en el servidor',
      details: error.message 
    });
  }
});

module.exports = router;