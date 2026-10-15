import { Router } from 'express';
import { 
  obtenerMedicamentos, 
  obtenerPorId, // <-- Asegúrate de que coincida con el export del controlador
  agregarMedicamento, 
  agregarCantidad, 
  eliminarMedicamento 
} from '../controllers/medicamento.controller.js';
import { 
  validarCrearMedicamento, 
  validarCantidadMedicamento, 
  validarRolMedicamentos 
} from '../middlewares/medicamento.middleware.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Obtener lista de medicamentos
router.get('/', verificarToken, obtenerMedicamentos);

// Obtener medicamento por ID (usando 'obtenerPorId')
router.get('/:id', verificarToken, obtenerPorId);

// 1. Agregar un nuevo medicamento
router.post(
  '/', 
  [verificarToken, validarRolMedicamentos, validarCrearMedicamento], 
  agregarMedicamento
);

// 2. Agregar stock/cantidad
router.patch(
  '/:id/cantidad', 
  [verificarToken, validarRolMedicamentos, validarCantidadMedicamento], 
  agregarCantidad
);

// 3. Eliminar un medicamento
router.delete(
  '/:id', 
  [verificarToken, validarRolMedicamentos], 
  eliminarMedicamento
);

export default router;