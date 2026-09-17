const express = require('express');

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);


const alumnoController =
    require('../controllers/alumnoController');

    // Consultar todos los alumnos
    router.get('/', alumnoController.listar );

    // Consultar un alumno
    router.get('/:id', alumnoController.obtener);

    // Registrar alumno
    router.post('/', alumnoController.crear);

    // Modificar alumno
    router.put('/:id', alumnoController.modificar);

    // Eliminar alumno
    router.delete ('/:id',alumnoController.eliminar);

    module.exports = router;