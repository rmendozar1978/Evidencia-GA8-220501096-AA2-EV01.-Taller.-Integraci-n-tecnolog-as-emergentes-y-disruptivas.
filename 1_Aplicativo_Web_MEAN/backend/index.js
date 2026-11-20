const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Conexión a la base de datos
const { mongoose } = require('./database');

// Configuraciones del servidor
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://localhost:3000'] }));

// Rutas de nuestro servidor
app.use('/api/empleados', require('./routes/empleado.routes'));

// Ruta de comprobación de salud del servidor
app.get('/', (req, res) => {
    res.json({
        status: 'Servidor API REST Gestión Empleados Activo',
        evidencia: 'SENA GA8-220501096-AA2-EV01',
        endpoints: [
            'GET /api/empleados - Listar empleados',
            'POST /api/empleados - Crear empleado',
            'GET /api/empleados/:id - Ver un empleado',
            'PUT /api/empleados/:id - Actualizar empleado',
            'DELETE /api/empleados/:id - Eliminar empleado'
        ]
    });
});

// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('====================================================');
    console.log('>>> [SENA ADSO] Servidor activo en el puerto:', app.get('port'));
    console.log('>>> API REST disponible en: http://localhost:' + app.get('port') + '/api/empleados');
    console.log('====================================================');
});
