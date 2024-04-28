const { Router } = require('express')
const { auth } = require('../middlewares/auth')
const AlunoController = require('../controllers/AlunoController')

const alunosRoutes = new Router()

alunosRoutes.post('/', AlunoController.create)
alunosRoutes.get('/', auth, AlunoController.findAll)
alunosRoutes.get('/:id', auth, AlunoController.findOne)

module.exports = alunosRoutes