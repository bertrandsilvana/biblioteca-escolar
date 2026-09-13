const express = require('express');
const db = require('./config/db');

const app = express();
const cors = require('cors');
const errorMiddleware = require("./middleware/errorMiddleware");

// Middleware para poder recibir datos en formato JSON
app.use(express.json());
app.use(cors());

// Traemos las rutas
const libroRoute = require('./routes/libroRoute');
const alumnoRoute = require('./routes/alumnoRoute');
const prestamoRoute = require('./routes/prestamoRoute');
const usuarioRoute = require('./routes/usuarioRoute');

// Rutas de la API
app.use('/libros', libroRoute);
app.use('/alumnos', alumnoRoute);
app.use('/prestamos', prestamoRoute);
app.use('/usuarios', usuarioRoute);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Biblioteca Escolar funcionando'
    });
});
/*app.get("/error", (req, res) => {
    throw new Error("Error de prueba");
});*/
app.use(errorMiddleware);

// Puerto
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});