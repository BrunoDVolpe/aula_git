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

    async create(req, res) {
        try {
            const { nome, duracao_horas } = req.body
            if(!nome) {
                return res.status(400).json({message: "O nome é obrigatório"})
            }
            if(!(duracao_horas >= 40 && duracao_horas <= 200)) {
                return res.status(400).json({message: "A duração do curso deve ser entre 40 e 200 horas"})
            }
            const curso = await Curso.create({
                nome: nome,
                duracao_horas: duracao_horas
            })
            
            res.status(201).json(curso)
    
        } catch(err) {
            console.log(err.message)
            res.status(500).json({error: 'Erro ao criar o curso.'})
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const curso = await Curso.findByPk(id)
        
            if(!curso) {
                return res.status(404).json({error: "Curso não encontrado"})
            }
        
            await curso.destroy()
        
            return res.status(204).json({})
    
        } catch(err) {
            console.log(err.message)
            res.status(500).json({error: 'Erro ao deletar o curso.'})
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { nome, duracao_horas } = req.body
            
            // Procurar curso
            const curso = await Curso.findByPk(id)
    
            if(!curso) {
                return res.status(404).json({error: "Curso não encontrado."})
            }
    
            // Validar informações novas
            if(!nome) {
                return res.status(400).json({message: "O nome do curso é obrigatório"})
            }
            if(!(duracao_horas >= 40 && duracao_horas <= 200)) {
                return res.status(400).json({message: "A duração do curso é obrigatória e deve ser entre 40 e 200 horas"})
            }
        
            curso.update({
                nome: nome,
                duracao_horas: duracao_horas
            })
            curso.save()
            
            res.status(200).json(curso)
    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({error: 'Erro ao atualizar o produto.'})
        }
    }
}

module.exports = new CursoController()