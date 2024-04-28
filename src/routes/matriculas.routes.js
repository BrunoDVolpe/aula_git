const { Router } = require('express')
const { auth } = require('../middlewares/auth')
const MatriculaController = require('../controllers/MatriculaController')

const matriculaRoutes = new Router()

matriculaRoutes.post('/', auth, MatriculaController.register)

module.exports = matriculaRoutes