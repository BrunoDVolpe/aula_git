const Aluno = require("../models/Aluno")
const Matricula = require("../models/Matricula")
const Curso = require("../models/Curso")

class MatriculaController {

    async register(req, res) {
        try {
            const aluno_id = req.body.aluno_id
            const curso_id = req.body.curso_id

            // Validar se o aluno e o curso foram passados no body
            if(!aluno_id || !curso_id) {
                return res
                .status(400)
                .json({ mensagem: "O ID do aluno e do curso são obrigatórios" })
            }

            // Validar se o aluno existe no banco de dados
            const aluno_existente = await Aluno.findByPk(aluno_id)

            if(!aluno_existente){
                return res.status(404).json({mensagem: "O aluno não existe"})
            }

            // Validar se o curso existe no banco de dados
            const curso_existente = await Curso.findByPk(curso_id)

            if(!curso_existente){
                return res.status(404).json({mensagem: "O curso não existe"})
            }

            // Validar se o aluno já está matriculado no curso
            const matricula_existente = await Matricula.findOne({
                where: {
                    aluno_id,
                    curso_id
                }
            })

            if(matricula_existente){
                // 409 é o status de conflito.
                return res.status(409).json({mensagem: "O aluno já está matriculado nesse curso"})
            }
            
            // Registrar a matrícula
            const matricula = await Matricula.create({
                aluno_id, // Quando a variável tem o mesmo nome da chave, podemos omitir e deixar apenas uma vez que o JS entende.
                curso_id // Ou seja, essa sintaxe curta é o mesmo que colocar "curso_id: curso_id"
            })
    
            res.status(201).json(matricula)
        } catch(err) {
            console.log(err.message)
            res.status(500).json({mensagem: "Houve um erro ao cadastrar a matrícula"})
        }
    }
}

module.exports = new MatriculaController()