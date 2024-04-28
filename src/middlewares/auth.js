// Verificar a autenticidade

const { verify } = require("jsonwebtoken")

// M1S12 - Ex2 - Middleware de autenticação
async function auth(req, res, next) {
    try {
        console.log('Entramos no middleware.')
        // console.log(req.headers)
        // Ou const { authorization } = req.headers -> substituir token por authorization.
        const token = req.headers.authorization
        
        req['payload'] = verify(token, process.env.SECRET_JWT)

        next()

    } catch(err) {
        return res.status(401).json({
            message: "A autenticação falhou.",
            error: err.message
        })
    }
}

module.exports = { auth }