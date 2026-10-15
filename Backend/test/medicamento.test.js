import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../src/app.js';

const tokenPrueba = jwt.sign(
  { id_usuario: 1, rol: 'ADMIN' }, 
  process.env.JWT_SECRET || 'secret_key',
  { expiresIn: '1h' }
);

describe('Testing de Endpoints de Medicamentos e Insumos', () => {

  // 1. Test GET - Listar todos
  it('GET /api/medicamentos - Debería responder con estado 200 y una lista', async () => {
    const res = await request(app)
      .get('/api/medicamentos')
      .set('Authorization', `Bearer ${tokenPrueba}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 2. Test POST - Crear un nuevo registro
  it('POST /api/medicamentos - Debería crear un nuevo medicamento', async () => {
    const nuevoMedicamento = {
      nombre: 'Acetaminofén',
      nombre_generico: 'Acetaminofén',
      presentacion: 'Tabletas',
      tipo_item: 'Medicamento',
      stock_actual: 100,
      cantidad: 100
    };

    const res = await request(app)
      .post('/api/medicamentos')
      .set('Authorization', `Bearer ${tokenPrueba}`)
      .send(nuevoMedicamento);

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('cantidad'); // Validamos una propiedad presente en la respuesta
  });

  // 3. Test GET por ID
  it('GET /api/medicamentos/:id - Debería obtener un medicamento por su ID', async () => {
    const idPrueba = 1; 
    const res = await request(app)
      .get(`/api/medicamentos/${idPrueba}`)
      .set('Authorization', `Bearer ${tokenPrueba}`);

    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('cantidad');
    } else {
      expect([400, 404]).toContain(res.statusCode); 
    }
  });

});