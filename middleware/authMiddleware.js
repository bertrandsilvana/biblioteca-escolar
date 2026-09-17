const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: 'Token no proporcionado'
            });
        }

        const token = authHeader.split(' ')[1];

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(401).json({
            error: 'Token inválido o expirado'
        });

    }
};

module.exports = authMiddleware;