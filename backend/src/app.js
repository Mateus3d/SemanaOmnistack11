const express = require('express')
const routes = require('./routes.js')
const cors = require('cors') //Pra segurança
const {errors} = require('celebrate')
const app = express() //Variável q vai armazenar a aplicação -> rotas e funcionalidades

app.use(cors())
app.use(express.json()) //Com isso ele converte tudo q recebe do corpo da requisição em json
app.use(routes)
app.use(errors())
/**
 * Tipos de parâmetros:
 * Query Params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação), ex: /users?name=Diego
 * request.query
 * Route Params: Parâmetros utilizados para identificar recursos, ex: /users/1. O id é 1, portanto, tudo do 1º User
 * e é acessado por /users/:id, request.params
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 * request.body
 */

 /**
  * BD: SQLite
  * Pode programar por linguagem SQL direta, ex: SELECT * FROM users
  * Mas pd programar pelo Query Builder, q é JS: table('users').select('*').where(...). Usaremos o knex
  */

 //Rota raiz, oq vai logo de inicio


//app.listen(3333)

module.exports = app
