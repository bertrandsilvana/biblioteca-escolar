const pool = require('../config/db.js');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
    const resultado = await pool.query(
        'SELECT id, nombre, email, rol FROM usuarios'
    );

    return resultado.rows;
};

// Obtener un usuario por su email
const obtenerUsuarioPorEmail = async (email) => {
    const resultado = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    );

    return resultado.rows[0];
};

// Crear un usuario
const crearUsuario = async (nombre, email, password, rol) => {

    // Generar hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    const resultado = await pool.query(
        `INSERT INTO usuarios (nombre, email, password, rol)
         VALUES ($1, $2, $3, $4)
         RETURNING id, nombre, email, rol`,
        [nombre, email, passwordHash, rol]
    );

    return resultado.rows[0];
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorEmail,
    crearUsuario
};