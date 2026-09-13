const usuarioModel = require('../models/usuarioModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res, next) => {
    try {
        const usuarios = await usuarioModel.obtenerUsuarios();

        res.json(usuarios);
    } catch (error) {
        next(error);
    }
};

// Crear un usuario
const crearUsuario = async (req, res, next) => {
    try {
        const { nombre, email, password, rol } = req.body;

        const nuevoUsuario = await usuarioModel.crearUsuario(
            nombre,
            email,
            password,
            rol
        );

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const usuario = await usuarioModel.obtenerUsuarioPorEmail(email);
        console.log("Usuario encontrado:", usuario);

        if (!usuario) {
            return res.status(401).json({
                error: 'Email o contraseña incorrectos'
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );
         console.log("Contraseña correcta:", passwordCorrecta);

        if (!passwordCorrecta) {
            return res.status(401).json({
                error: 'Email o contraseña incorrectos'
            });
        }

        // Generar JWT
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.json({
            mensaje: 'Autenticación exitosa',
            token: token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    login
};