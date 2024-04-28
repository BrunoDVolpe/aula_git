const { Router } = require('express')
const alunosRoutes = require('./alunos.routes')
const cursosRoutes = require('./cursos.routes')
const professoresRoutes = require('./professores.routes')
const loginRoutes = require('./login.routes')
const matriculaRoutes = require('./matriculas.routes')

const routes = Router()

routes.use('/alunos', alunosRoutes)
routes.use('/cursos', cursosRoutes)
routes.use('/professores', professoresRoutes)
routes.use('/login', loginRoutes)
routes.use('/matriculas', matriculaRoutes)

module.exports = routes