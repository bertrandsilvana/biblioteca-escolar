const pool = require('../config/db.js');

// Obtener todos los préstamos
const obtenerTodos = async () => {

    const resultado = await pool.query(`
        SELECT
            p.id_prestamo,
            p.fecha_prestamo,
            p.fecha_devolucion,
            p.estado,

            a.id_alumno,
            a.nombre,
            a.apellido,
            a.dni,

            l.id_libro,
            l.titulo,
            l.autor

        FROM prestamo p

        INNER JOIN alumnos a
            ON p.id_alumno = a.id_alumno

        INNER JOIN libros l
            ON p.id_libro = l.id_libro

        ORDER BY p.fecha_prestamo DESC
    `);

    return resultado.rows;
};


// Obtener préstamos de un alumno
const obtenerPorAlumno = async (id_alumno) => {

    const resultado = await pool.query(`
        SELECT
            p.id_prestamo,
            p.fecha_prestamo,
            p.fecha_devolucion,
            p.estado,

            l.id_libro,
            l.titulo,
            l.autor

        FROM prestamo p

        INNER JOIN libros l
            ON p.id_libro = l.id_libro

        WHERE p.id_alumno = $1

        ORDER BY p.fecha_prestamo DESC
    `, [id_alumno]);

    return resultado.rows;
};


// Crear préstamo
const crear = async (
    id_alumno,
    id_libro,
    fecha_prestamo
) => {

    // El alumno debe existir
    const alumno = await pool.query(`
        SELECT *
        FROM alumnos
        WHERE id_alumno = $1
    `, [id_alumno]);

    if (alumno.rows.length === 0) {
        throw new Error('El alumno no está registrado');
    }

    // El libro no debe tener un préstamo activo
    const libroPrestado = await pool.query(`
        SELECT *
        FROM prestamo
        WHERE id_libro = $1
        AND estado = TRUE
    `, [id_libro]);

    if (libroPrestado.rows.length > 0) {
        throw new Error('El libro no está disponible');
    }

    // Registrar el préstamo
    const resultado = await pool.query(`
        INSERT INTO prestamo
        (
            id_alumno,
            id_libro,
            fecha_prestamo,
            estado
        )
        VALUES
        ($1, $2, $3, TRUE)
        RETURNING *
    `, [
        id_alumno,
        id_libro,
        fecha_prestamo
    ]);

    return resultado.rows[0];
};


// Registrar devolución
const devolver = async (
    id_prestamo,
    fecha_devolucion
) => {

    const resultado = await pool.query(`
        UPDATE prestamo
        SET
            fecha_devolucion = $1,
            estado = FALSE
        WHERE id_prestamo = $2
        RETURNING *
    `, [
        fecha_devolucion,
        id_prestamo
    ]);

    return resultado.rows[0];
};


module.exports = {
    obtenerTodos,
    obtenerPorAlumno,
    crear,
    devolver
};