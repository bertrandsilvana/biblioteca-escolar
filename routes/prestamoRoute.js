const express = require('express');

const router = express.Router();

const prestamoController = require('../controllers/prestamoController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require("../middleware/roleMiddleware");


router.use(authMiddleware);


// GET /prestamos
router.get('/', roleMiddleware(["bibliotecario"]), prestamoController.listar);


// GET /prestamos/:id
router.get('/:id', roleMiddleware(["bibliotecario"]),prestamoController.listarPorAlumno);


// POST /prestamos
router.post('/',  roleMiddleware(["bibliotecario"]),  prestamoController.crear);


// PUT /prestamos/:id
router.put('/:id', roleMiddleware(["bibliotecario"]),prestamoController.devolver);


module.exports = router;