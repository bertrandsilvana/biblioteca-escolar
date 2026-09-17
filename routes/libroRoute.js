const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const libroController =
    require('../controllers/libroController');


router.use(authMiddleware);

// Ver todos los libros

router.get(
    '/',
    roleMiddleware(['alumno', 'docente', 'bibliotecario']),
    libroController.listar
);

// Ver un libro

router.get(
    '/:id',
    roleMiddleware(['alumno', 'docente', 'bibliotecario']),
    libroController.obtener
);

// Agregar un libro
router.post(
    '/',
    roleMiddleware(['bibliotecario']),
    libroController.crear
);

// Modificar un libro
router.put(
    '/:id',
    roleMiddleware(['bibliotecario']),
    libroController.modificar
);

// Eliminar un libro

router.delete(
    '/:id',
    roleMiddleware(['bibliotecario']),
    libroController.eliminar
);

module.exports = router;