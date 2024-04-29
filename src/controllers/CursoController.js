const Curso = require("../models/Curso")

class CursoController {
    async findAll(req, res) {
        let params = {}
        if(req.query.nome) {
            params = {...params, nome: req.query.nome}
        }
        if(req.query.duracao_horas){
            params = {...params, duracao_horas: req.query.duracao_horas}
        }

        const cursos = await Curso.findAll({
            where: params
        })

        res.json(cursos)
    }
}

module.exports = new CursoController()