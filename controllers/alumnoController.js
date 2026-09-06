const alumnoModel = require('../models/alumnoModel');

// Consultar todos los alumnos
const listar = async (req, res) => {
    try {
        const alumnos = await alumnoModel.obtenerTodos();

        res.json(alumnos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al consultar los alumnos'
        });
    }
};

// Consultar un alumno
const obtener = async (req, res) => {
    try {
        const { id } = req.params;

        const alumno = await alumnoModel.obtenerPorId(id);

        if (!alumno) {
            return res.status(404).json({
                mensaje: 'Alumno no encontrado'
            });
        }

        res.json(alumno);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al consultar el alumno'
        });
    }
};

// Registrar un alumno
const crear = async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            dni
        } = req.body;

        const alumno = await alumnoModel.crear(
            nombre,
            apellido,
            dni
        );

        res.status(201).json(alumno);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al registrar el alumno'
        });
    }
};
// Modificar un alumno
const modificar = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nombre,
            apellido,
            dni
        } = req.body;

        const alumno = await alumnoModel.modificar(
            id,
            nombre,
            apellido,
            dni
        );

        if (!alumno) {
            return res.status(404).json({
                mensaje: 'Alumno no encontrado'
            });
        }

        res.json(alumno);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al modificar el alumno'
        });
    }
};

// Eliminar un alumno
const eliminar = async (req, res) => {
    try {
        const { id } = req.params;

        const alumno = await alumnoModel.eliminar(id);

        if (!alumno) {
            return res.status(404).json({
                mensaje: 'Alumno no encontrado'
            });
        }

        res.json({
            mensaje: 'Alumno eliminado correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar el alumno'
        });
    }
};

module.exports = {
    listar,
    obtener,
    crear,
    modificar,
    eliminar
};