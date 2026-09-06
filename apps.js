const express = require('express');
const db = require('./config/db');

const app = express();
const cors = require('cors');

// Middleware para poder recibir datos en formato JSON
app.use(express.json());
app.use(cors());

// Traemos las rutas
const libroRoute = require('./routes/libroRoute');
const alumnoRoute = require('./routes/alumnoRoute');
const prestamoRoute = require('./routes/prestamoRoute');

// Rutas de la API
app.use('/libros', libroRoute);
app.use('/alumnos', alumnoRoute);
app.use('/prestamos', prestamoRoute);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Biblioteca Escolar funcionando'
    });
});

// Puerto
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});