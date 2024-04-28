const Aluno = require("../models/Aluno")
const { sign } = require('jsonwebtoken')

class LoginController{
    async login(req, res){
        try {
            const email = req.body.email
            const password = req.body.password
    
            if(!email) {
                return res.status(400).json({message: "O email é obrigatório"})
            }
    
            if(!password) {
                return res.status(400).json({message: "A senha é obrigatória"})
            }
    
            const aluno = await Aluno.findOne({
                where: {email: email, password: password}
            })
    
            if(!aluno){
                return res.status(404).json({message: "E-mail e/ou senha incorretos."})
            }
    
            // Para o JWT, precisamos gerar apenas o payload. Passamos o ID dentro do sub, o e-mail e aproveitamos e mandamos também o nome
            const payload = {sub: aluno.id, email: aluno.email, nome:aluno.nome}
    
            const token = sign(payload, process.env.SECRET_JWT, {
                expiresIn: '24h' //60 (número) para 60 segundos // Colocar tempo de expiração do token.
            })
    
            res.status(200).json({Token: token})
    
        } catch(err) {
            res.status(500).json({error: err, message: "Algo deu errado."})
        }
    }
}

module.exports = new LoginController()