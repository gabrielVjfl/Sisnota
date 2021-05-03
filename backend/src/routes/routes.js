const express = require("express");

const route = express.Router();

const SeriesController = require('../controllers/SeriesController')
const UsersController = require('../controllers/UsersController')
const AlunosController = require('../controllers/AlunosController')
const NotasController = require('../controllers/NotasController')
const PrivateRoute = require('../private/PrivateRoute')
const PrivateRouteParams = require('../private/PrivateRouteParams')


route.post('/serie/create', PrivateRoute, SeriesController.create)
route.get('/serie/list', PrivateRoute,  SeriesController.index)


route.post('/user/create', UsersController.create)
route.post('/user/login', UsersController.login)


route.post('/alunos/create', PrivateRoute,  AlunosController.create)
route.get('/alunos/list/:id', PrivateRouteParams,   AlunosController.index)
route.get('/alunos/notas/:id', PrivateRouteParams,  AlunosController.notas)
route.get('/alunos/count', AlunosController.countAlunos)
route.get('/alunos/list/params/:id', PrivateRoute, AlunosController.indexParamsAlunos)
route.put('/alunos/update/:id', PrivateRoute, AlunosController.update)
route.delete('/alunos/delete/:id', PrivateRoute, AlunosController.delete)

route.post('/notas/create', PrivateRoute,  NotasController.create)
route.get('/notas/list/:id', PrivateRoute, NotasController.notasIndex)
route.put('/notas/update/:id', PrivateRoute, NotasController.update)
module.exports = route
