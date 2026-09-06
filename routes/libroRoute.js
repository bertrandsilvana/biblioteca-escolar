const express = require('express');

const router = express.Router();

const libroController =
            require('../controllers/libroController');

        router.get( '/', libroController.listar );

        router.get('/:id', libroController.obtener );

        router.post('/', libroController.crear );

        router.put('/:id', libroController.modificar);

        router.delete('/:id',libroController.eliminar);

        module.exports = router;