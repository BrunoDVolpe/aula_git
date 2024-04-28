const { Router } = require('express')
const Curso = require('../models/Curso')
const { auth } = require('../middlewares/auth')

const cursosRoutes = new Router()

cursosRoutes.post('/', async (req, res) => {
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
})

// Ex. 2 - Get simples
// cursosRoutes.get('/', async (req, res) => {
//     const cursos = await Curso.findAll()
//     res.json(cursos)
// })

// Ex. 3 - Get com Query Params
cursosRoutes.get('/', auth, async (req, res) => {
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
})

cursosRoutes.get('/', auth, async (req, res) => {
    // Se não tiver o parâmetro, estamos dando o valor '' para não quebrar no where. Douglas disse que depois vão explicar como contornar isso.
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
})

// Deletar de forma simples
// Dessa forma, se o item não existir, a aplicação não vai quebrar, mas não teria porque 'estressar' o banco.
// cursosRoutes.delete('/:id', (req, res) => {
//     const { id } = req.params
//     Curso.destroy({
//         where: {
//             id: id
//         }
//     }) // Equivalente a DELETE FROM cursos WHERE id = id;
//     res.status(204).json({})
// })

// Ex. 5 - Deletar validando se o item existe.
cursosRoutes.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const curso = await Curso.findByPk(id)
    
        if(!curso) {
            return res.status(404).json({error: "Não encontrado"})
        }
    
        await curso.destroy()
    
        return res.status(204).json({})

    } catch(err) {
        console.log(err.message)
        res.status(500).json({error: 'Erro ao deletar o curso.'})
    }
})

// cursosRoutes.put('/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const { nome, duracao_horas } = req.body
        
//         // Validar informações novas
//         if(!nome) {
//             return res.status(400).json({message: "O nome do curso é obrigatório"})
//         }
//         if(!(duracao_horas >= 40 && duracao_horas <= 200)) {
//             return res.status(400).json({message: "A duração do curso é obrigatória e deve ser entre 40 e 200 horas"})
//         }
    
//         const [curso_atualizado] = await Curso.update({
//             nome: nome,
//             duracao_horas: duracao_horas}, {
//                 where: {
//                     id: id }
//         })

//         if (!curso_atualizado) {
//             console.log(curso_atualizado)
//             return res.status(404).json({error: 'Curso não encontrado.'})
//         }
        
//         res.status(200).json({message: 'curso atualizado com sucesso'})

//     } catch (error) {
//         console.log(error.message)
//         res.status(500).json({error: 'Erro ao atualizar o produto.'})
//     }
// })

// Ex. 4 - Atualizando e retornando o objeto
cursosRoutes.put('/:id', auth, async (req, res) => {
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
})

module.exports = cursosRoutes