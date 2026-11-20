const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/empleados';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('>>> [DB] MongoDB conectado exitosamente en:', URI))
    .catch(err => {
        console.warn('>>> [DB AVISO] No se pudo conectar a MongoDB local (' + err.message + ').');
        console.warn('>>> [DB AVISO] Si no tienes MongoDB instalado, el servidor continuará activo para pruebas.');
    });

module.exports = mongoose;
