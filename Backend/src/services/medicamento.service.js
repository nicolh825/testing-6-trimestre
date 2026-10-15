import { MedicamentoRepository } from '../repositories/medicamento.repository.js';

export const MedicamentoService = {
  // 0. Obtener todos los medicamentos
  async obtenerTodos() {
    return await MedicamentoRepository.findAll(); // Asegúrate de que tu repositorio use este método para listar
  },

  // 0.1. Obtener un medicamento por su ID
  async obtenerPorId(id) {
    const medicamento = await MedicamentoRepository.findById(id);
    if (!medicamento) {
      throw new Error('El medicamento no fue encontrado.');
    }
    return medicamento;
  },

  // 1. Agregar un nuevo medicamento
  async agregar(medicamentoData) {
    // Si envían un id_medicamento y quieres validar si ya existe:
    if (medicamentoData.id_medicamento) {
      const existente = await MedicamentoRepository.findById(medicamentoData.id_medicamento);
      if (existente) {
        throw new Error('Ya existe un medicamento con ese identificador.');
      }
    }
    return await MedicamentoRepository.create(medicamentoData);
  },

  // 2. Agregar cantidad (stock) a un medicamento
  async agregarCantidad(id, cantidadASumar) {
    const medicamento = await MedicamentoRepository.findById(id);
    if (!medicamento) {
      throw new Error('El medicamento no fue encontrado en el inventario.');
    }
    return await MedicamentoRepository.sumarCantidad(id, cantidadASumar);
  },

  // 3. Eliminar un medicamento
  async eliminar(id) {
    const medicamento = await MedicamentoRepository.findById(id);
    if (!medicamento) {
      throw new Error('El medicamento que intentas eliminar no existe.');
    }
    return await MedicamentoRepository.delete(id);
  }
};