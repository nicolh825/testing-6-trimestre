import pool from '../config/db.js';
import { Usuario } from '../models/auth.model.js';

export const AuthRepository = {
  async findByUsername(username) {
    const query = `
      SELECT u.*, r.nombre AS rol_nombre 
      FROM usuarios u
      LEFT JOIN roles r ON u.id_rol = r.id_rol
      WHERE u.username = $1 OR u.email = $1;
    `;
    const { rows } = await pool.query(query, [username]);
    if (!rows[0]) return null;
    return new Usuario(rows[0]);
  },

  async create(usuarioData) {
    const { username, email, password, id_rol } = usuarioData;
    const query = `
      INSERT INTO usuarios (username, email, password, id_rol)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [username, email, password, id_rol || 6]);
    return new Usuario(rows[0]);
  }
};