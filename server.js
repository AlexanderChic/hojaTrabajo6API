require('dotenv').config();
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// IMPORTANTE: No uses '/login', usa '/' porque la ruta ya está definida en auth.js
app.use('/', authRoutes);  // Cambio aquí
app.use('/users', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API con JWT funcionando',
    endpoints: {
      login: 'POST /login',
      users: 'GET /users (requiere token)',
      createUser: 'POST /users'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});