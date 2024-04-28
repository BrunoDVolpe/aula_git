const Aluno = require("../models/Aluno")

class AlunoController {
    // Construtor
    // Métodos
    // Atributos

    async findAll(req, res){
        try {
            const alunos = await Aluno.findAll()
            res.json(alunos)
        }
        catch {
            res.status(500).json({error: "Não foi possível listar os alunos"})
        }
    }

    async findOne(req, res){
        try {
            const { id } = req.params
            const aluno = await Aluno.findByPk(id)
        
            if(!id) {
                return res.status(404).json({error: "Aluno não encontrado"})
            }
        
            res.send(aluno)
    
        } catch(err) {
            console.log(err.message)
            res.status(500).json({error: 'Erro ao listar o aluno.'})
        }
    }

    async create(req, res){
        try {
            const { nome, data_nascimento, celular, email, password } = req.body
    
            if(!nome) {
                return res.status(400).json({message: "O nome é obrigatório"})
            }
    
            if(!data_nascimento) {
                return res.status(400).json({message: "A data de nascimento é obrigatória"})
            }
            // Validar data nascimento por regex (exemplo simples, sem conferir se mês tem entre 1 e 12 e dia entre 1 e 31)
            if(!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)){
                return res.status(400).json({message: "A data de nascimento não está no formato correto"})
            }
    
            if(!email) {
                return res.status(400).json({message: "O email é obrigatório"})
            }
    
            if(!password) {
                return res.status(400).json({message: "A senha é obrigatória"})
            }
    
            const aluno = await Aluno.create({
                email: email,
                password: password,
                nome: nome,
                data_nascimento: data_nascimento,
                celular: celular
            })
            res.status(201).json(aluno)
        } catch (err) {
            console.log(err.message)
            res.status(500).json({error: "Não foi possível cadastrar o aluno"})
        }
    }
}

module.exports = new AlunoController()