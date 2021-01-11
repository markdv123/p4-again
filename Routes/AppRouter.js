const Router = require('express').Router()

const UserRouter = require('./UserRouter')
const GameRouter = require('./GameRouter')
const CategoryRouter = require('./CategoryRouter')
const QuestionRouter = require('./QuestionRouter')

Router.use('/users', UserRouter)
Router.use('/games', GameRouter)
Router.use('/categories', CategoryRouter)
Router.use('/questions', QuestionRouter)

module.exports = Router