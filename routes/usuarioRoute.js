const express = require('express');

const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

// Obtener usuarios
router.get('/', usuarioController.obtenerUsuarios);

// Crear usuario
router.post('/', usuarioController.crearUsuario);

// Login
router.post('/login', usuarioController.login);

module.exports = router;