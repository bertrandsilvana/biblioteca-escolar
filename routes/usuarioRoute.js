const express = require('express');

const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

const authMiddleware = require('../middleware/authMiddleware');

// Obtener usuarios
router.get('/', usuarioController.obtenerUsuarios);

// Crear usuario
router.post('/', usuarioController.crearUsuario);

// Login
router.post('/login', usuarioController.login);

// Ruta protegida
router.get('/perfil', authMiddleware, (req, res) => {

    res.json({
        mensaje: 'Acceso autorizado',
        usuario: req.usuario
    });
    });


module.exports = router;