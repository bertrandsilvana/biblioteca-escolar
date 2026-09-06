const pool = require('../config/db.js');

const obtenerTodos = async () => {
    const resultado = await pool.query(`
        SELECT *
        FROM libros
        ORDER BY titulo
    `);

    return resultado.rows;
};

const obtenerPorId = async (id) => {
    const resultado = await pool.query(
        `SELECT *
         FROM libros
         WHERE id_libro = $1`,
        [id]
    );

    return resultado.rows[0];
};

const crear = async (titulo, autor, anio_publicacion) => {
    const resultado = await pool.query(
        `INSERT INTO libros
        (titulo, autor, anio_publicacion)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [titulo, autor, anio_publicacion]
    );

    return resultado.rows[0];
};

const modificar = async (
    id,
    titulo,
    autor,
    anio_publicacion
) => {
    const resultado = await pool.query(
        `UPDATE libros
         SET titulo = $1,
             autor = $2,
             anio_publicacion = $3
         WHERE id_libro = $4
         RETURNING *`,
        [
            titulo,
            autor,
            anio_publicacion,
            id
        ]
    );

    return resultado.rows[0];
};

const eliminar = async (id) => {
    const resultado = await pool.query(
        `DELETE FROM libros
         WHERE id_libro = $1
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