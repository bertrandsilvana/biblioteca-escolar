const prestamoModel =
    require('../models/prestamoModel');


// CONSULTAR TODOS LOS PRÉSTAMOS

const listar = async (req, res) => {

    try {

        const prestamos =
            await prestamoModel.obtenerTodos();

        res.json(prestamos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al consultar los préstamos'
        });
    }
};


// CONSULTAR PRÉSTAMOS DE UN ALUMNO

const listarPorAlumno = async (req, res) => {

    try {

        const { id } = req.params;

        const prestamos =
            await prestamoModel.obtenerPorAlumno(id);

        res.json(prestamos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje:
                'Error al consultar los préstamos del alumno'
        });
    }
};


// REGISTRAR PRÉSTAMO

const crear = async (req, res) => {

    try {

        const {
                    id_alumno,
                    id_libro,
                    fecha_prestamo
                } = req.body;

        const prestamo =
                    await prestamoModel.crear(
                    id_alumno,
                    id_libro,
                    fecha_prestamo
                );

        res.status(201).json(prestamo);

    } catch (error) {

        console.error(error);

        res.status(400).json({
            mensaje: error.message
        });
    }
};


// REGISTRAR DEVOLUCIÓN

const devolver = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            fecha_devolucion
        } = req.body;


        const prestamo =
            await prestamoModel.devolver(
                id,
                fecha_devolucion
            );


        if (!prestamo) {

            return res.status(404).json({
                mensaje: 'Préstamo no encontrado'
            });
        }


        res.json(prestamo);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al registrar la devolución'
        });
    }
};


module.exports = {
    listar,
    listarPorAlumno,
    crear,
    devolver
};