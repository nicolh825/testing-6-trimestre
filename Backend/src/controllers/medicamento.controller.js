import { MedicamentoService } from '../services/medicamento.service.js';

// 0. Obtener la lista de todos los medicamentos
export const obtenerMedicamentos = async (req, res) => {
  try {
    const medicamentos = await MedicamentoService.obtenerTodos();
    res.status(200).json(medicamentos);
  } catch (error) {
    console.error("ERROR REAL EN GET /MEDICAMENTOS:", error); // <-- Esto imprimirá el error real en la consola de la terminal
    res.status(500).json({ error: error.message || 'Error desconocido' });
  }
};

// 0.1. Obtener un medicamento específico por su ID
export const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const medicamento = await MedicamentoService.obtenerPorId(id);
    res.status(200).json(medicamento);
  } catch (error) {
    console.error("ERROR REAL EN GET /MEDICAMENTOS/:id:", error);
    res.status(400).json({ error: error.message || 'Error desconocido' });
  }
};

// 1. Agregar un nuevo medicamento al sistema
export const agregarMedicamento = async (req, res) => {
  try {
    const nuevoMedicamento = await MedicamentoService.agregar(req.body);
    res.status(201).json(nuevoMedicamento);
  } catch (error) {
    console.error("ERROR REAL EN POST /MEDICAMENTOS:", error); // <-- Esto imprimirá el error real del POST
    res.status(400).json({ error: error.message || 'Error desconocido' });
  }
};

export const agregarCantidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;
    const medicamentoActualizado = await MedicamentoService.agregarCantidad(id, cantidad);
    res.json(medicamentoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error desconocido' });
  }
};

export const eliminarMedicamento = async (req, res) => {
  try {
    const { id } = req.params;
    await MedicamentoService.eliminar(id);
    res.status(200).json({ mensaje: 'Medicamento eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ error: error.message || 'Error desconocido' });
  }
};