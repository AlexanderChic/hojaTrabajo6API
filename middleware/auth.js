const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  // Obtener el token del header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Acceso denegado. No se proporcionó token.' 
    });
  }

  try {
    // Verificar el token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        error: 'Token expirado. Por favor, inicia sesión nuevamente.' 
      });
    }
    return res.status(403).json({ 
      error: 'Token inválido.' 
    });
  }
};

module.exports = authenticateToken;