// M1S12 Ex-4 - Rotas privadas, com exceção de login e criação
// M1S12 Ex-5 - Rotas por contexto. Contexto: Professores
const { Router } = require('express')
const Curso = require('../models/Curso')
const Professor = require('../models/Professor')
const { auth } = require('../middlewares/auth')
const { sign } = require('jsonwebtoken')


const professoresRoutes = new Router()

//professoresRoutes.use(auth) se fosse aplicar em todas as rotas
// Neste caso, por conta dessa arquitetura, aplicando o middleware nas rotas get, put e delete.

/* ----- Rota de Login para professores ----- */
// Ex. 3 - Rotas públicas - login e criar professores

// Rota pública: logar um professor
professoresRoutes.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if(!email) {
        return res.status(400).json({message: "O email é obrigatório"})
    }

    if(!password) {
        return res.status(400).json({message: "A senha é obrigatória"})
    }

    const professor = await Professor.findOne({
        where: {email: email, password: password}
    })

    console.log(professor)

    if(!professor) {
        return res.status(404).json({message: "Usuário e/ou senha incorretos"})
    }

    // Para o JWT, precisamos gerar apenas o payload. Passamos o ID dentro do sub, o e-mail e aproveitamos e mandamos também outas infos não sigilosas
    const payload = {sub: professor.id, email: professor.email, nome:professor.nome}

    const token = sign(payload, process.env.SECRET_JWT)

    res.status(200).json({token: token})
})

/* ----- Rotas Professores ----- */

// Rota pública: criar um professor
professoresRoutes.post('/', async (req, res) => {
    try {
        const { nome, email, password, data_admissao, data_demissao, curso_id } = req.body
        let dados_professor = {}

        if(!nome) {
            return res.status(400).json({error: 'O nome do professor é obrigatório.'})
        }
        if(!email) {
            return res.status(400).json({error: 'O email do professor é obrigatório.'})
        }
        if(!password) {
            return res.status(400).json({error: 'A senha do professor é obrigatória.'})
        }
        if(!data_admissao) {
            return res.status(400).json({error: 'A data de admissão é obrigatória.'})
        }
        if(!data_admissao.match(/\d{4}-\d{2}-\d{2}/gm)){
            return res.status(400).json({message: "A data de admissão não está no formato correto"})
        }
        if(data_demissao){
            if (!data_demissao.match(/\d{4}-\d{2}-\d{2}/gm)){
                return res.status(400).json({message: "A data de demissão não está no formato correto"})
            }
            dados_professor = { ...dados_professor, data_demissao: data_demissao }
        }
        if(curso_id){
            const curso = await Curso.findByPk(parseInt(curso_id))
            if(!curso){
                return res.status(404).json({error: 'Curso não encontrado.'})
            }
            dados_professor = { ...dados_professor, curso_id: parseInt(curso_id) }
        }

        dados_professor = { nome: nome, email: email, password: password, data_admissao: data_admissao, ...dados_professor }
        const professor = await Professor.create(
            dados_professor
        )
        res.status(201).json(professor)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error: 'Erro ao criar o professor'})
    }
})

// Rota privada: listar professores
professoresRoutes.get('/', auth, async (req, res) => {
    const professores = await Professor.findAll()
    return res.json(professores)
})

// Rota privada: excluir um professor
professoresRoutes.delete('/:id', auth, async (req, res) => {
    const { id } = req.params
    const professor = await Professor.findByPk(id)

    if(!professor) {
        return res.status(404).json({error: 'Professor não encontrado.'})
    }

    await professor.destroy()
    return res.status(204).json({})
})

// Rota privada: Alterar um professor
professoresRoutes.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const { nome, data_admissao, data_demissao, curso_id } = req.body
        let dados_professor = {}

        const professor = await Professor.findByPk(id)
        if(!professor) {
            return res.status(404).json({error: 'Professor não encontrado.'})
        }

        if(!nome) {
            return res.status(400).json({error: 'O nome do professor é obrigatório.'})
        }
        if(!data_admissao) {
            return res.status(400).json({error: 'A data de admissão é obrigatória.'})
        }
        if(!data_admissao.match(/\d{4}-\d{2}-\d{2}/gm)){
            return res.status(400).json({message: "A data de admissão não está no formato correto"})
        }
        if(data_demissao){
            if (!data_demissao.match(/\d{4}-\d{2}-\d{2}/gm)){
                return res.status(400).json({message: "A data de demissão não está no formato correto"})
            }
            dados_professor = { ...dados_professor, data_demissao: data_demissao }
        }
        if(curso_id){
            const curso = await Curso.findByPk(parseInt(curso_id))
            if(!curso){
                return res.status(404).json({error: 'Curso não encontrado.'})
            }
            dados_professor = { ...dados_professor, curso_id: parseInt(curso_id) }
        }

        dados_professor = { nome: nome, data_admissao: data_admissao, ...dados_professor }
        professor.update(
            dados_professor
        )
        professor.save()

        res.status(200).json(professor)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error: 'Erro ao criar o professor'})
    }
})

module.exports = professoresRoutes