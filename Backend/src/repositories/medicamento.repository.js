import pool from '../config/db.js';
import { Medicamento } from '../models/medicamento.model.js';

export const MedicamentoRepository = {
  // 0. Obtener todos los registros
  async findAll() {
    const query = `SELECT * FROM medicamentos_insumos;`;
    const { rows } = await pool.query(query);
    return rows.map(row => new Medicamento(row));
  },

  // 1. Crear un nuevo registro
  async create(medicamentoData) {
    const { nombre_generico, nombre_comercial, presentacion, concentracion, tipo_item, stock_actual } = medicamentoData;
    const query = `
      INSERT INTO medicamentos_insumos (nombre_generico, nombre_comercial, presentacion, concentracion, tipo_item, stock_actual)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      nombre_generico, 
      nombre_comercial || '', 
      presentacion || 'Unidad', 
      concentracion || '', 
      tipo_item || 'Medicamento', 
      stock_actual || 0
    ];
    const { rows } = await pool.query(query, values);
    return new Medicamento(rows[0]);
  },

  // 2. Buscar por ID (id_item)
  async findById(id) {
    const query = `SELECT * FROM medicamentos_insumos WHERE id_item = $1;`;
    const { rows } = await pool.query(query, [id]);
    if (!rows[0]) return null;
    return new Medicamento(rows[0]);
  },

  // 3. Sumar cantidad (stock_actual)
  async sumarCantidad(id, cantidadASumar) {
    const query = `
      UPDATE medicamentos_insumos 
      SET stock_actual = stock_actual + $1 
      WHERE id_item = $2 
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [cantidadASumar, id]);
    if (!rows[0]) return null;
    return new Medicamento(rows[0]);
  },

  // 4. Eliminar registro
  async delete(id) {
    const query = `DELETE FROM medicamentos_insumos WHERE id_item = $1 RETURNING *;`;
    const { rows } = await pool.query(query, [id]);
    return rows[0] ? new Medicamento(rows[0]) : null;
  }
};