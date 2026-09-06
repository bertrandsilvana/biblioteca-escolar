const libroModel = require('../models/libroModel');

const listar = async (req, res) => {
    try {
        const libros = await libroModel.obtenerTodos();

        res.json(libros);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al consultar los libros'
        });
    }
};

const obtener = async (req, res) => {
    try {
        const { id } = req.params;

        const libro = await libroModel.obtenerPorId(id);

        if (!libro) {
            return res.status(404).json({
                mensaje: 'Libro no encontrado'
            });
        }

        res.json(libro);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al consultar el libro'
        });
    }
};

const crear = async (req, res) => {
    try {
        const {
            titulo,
            autor,
            anio_publicacion
        } = req.body;

        const libro = await libroModel.crear(
            titulo,
            autor,
            anio_publicacion
        );

        res.status(201).json(libro);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al registrar el libro'
        });
    }
};

const modificar = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            titulo,
            autor,
            isbn,
            anio_publicacion
        } = req.body;

        const libro = await libroModel.modificar(
            id,
            titulo,
            autor,
            isbn,
            anio_publicacion
        );

        res.json(libro);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al modificar el libro'
        });
    }
};

const eliminar = async (req, res) => {
    try {
        const { id } = req.params;

        const libro = await libroModel.eliminar(id);

        if (!libro) {
            return res.status(404).json({
                mensaje: 'Libro no encontrado'
            });
        }

        res.json({
            mensaje: 'Libro eliminado correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar el libro'
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