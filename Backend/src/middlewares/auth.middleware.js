import jwt from 'jsonwebtoken';

// Middleware para verificar la validez del Token JWT
export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado: No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.usuario = decoded; // { id_usuario, rol, ... }
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};

// Middleware para controlar el acceso según roles del sistema
export const permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario || !req.usuario.rol) {
      return res.status(401).json({ error: 'Usuario no autenticado o rol no asignado.' });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ 
        error: `Acceso denegado: El rol '${req.usuario.rol}' no tiene permisos para esta acción.` 
      });
    }

    next();
  };
};

// Middleware para validar campos obligatorios en el Login
export const validarLogin = (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'El campo de usuario/correo y la contraseña son obligatorios.' });
  }
  
  next();
};

// Middleware para validar campos obligatorios en el Registro
export const validarRegistro = (req, res, next) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos (username, email y password) son obligatorios para el registro.' });
  }
  
  next();
};