const pool = require('../config/db.js');

// Obtener todos los alumnos
const obtenerTodos = async () => {
    const resultado = await pool.query(`
        SELECT *
        FROM alumnos
        ORDER BY apellido, nombre
    `);

    return resultado.rows;
};

// Obtener un alumno por ID
const obtenerPorId = async (id) => {
    const resultado = await pool.query(
        `SELECT *
         FROM alumnos
         WHERE id_alumno = $1`,
        [id]
    );

    return resultado.rows[0];
};

// Registrar un alumno
const crear = async (nombre, apellido, dni) => {

    const resultado = await pool.query(
        `INSERT INTO alumnos
        (nombre, apellido, dni)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [nombre, apellido, dni]
    );

    return resultado.rows[0];
};

// Modificar un alumno
const modificar = async (
    id,
    nombre,
    apellido,
    dni
) => {
    const resultado = await pool.query(
        `UPDATE alumnos
         SET nombre = $1,
             apellido = $2,
             dni = $3
         WHERE id_alumno = $4
         RETURNING *`,
        [
            nombre,
            apellido,
            dni,
            id
        ]
    );

    return resultado.rows[0];
};

// Eliminar un alumno
const eliminar = async (id) => {
    const resultado = await pool.query(
        `DELETE FROM alumnos
         WHERE id_alumno = $1
         RETURNING *`,
        [id]
    );

    return resultado.rows[0];
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    modificar,
    eliminar
};