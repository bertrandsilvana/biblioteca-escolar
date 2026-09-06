const express = require('express');

const router = express.Router();

const prestamoController =
    require('../controllers/prestamoController');


// GET /prestamos
router.get(
    '/',
    prestamoController.listar
);


// GET /prestamos/:id
router.get(
    '/:id',
    prestamoController.listarPorAlumno
);


// POST /prestamos
router.post(
    '/',
    prestamoController.crear
);


// PUT /prestamos/:id
router.put(
    '/:id',
    prestamoController.devolver
);


module.exports = router;