const Router = require('express').Router()
const GameController = require('../controllers/GameController')

Router.get('/', GameController.GetGames)
Router.get('/by/:user_id', GameController.GetGamesByUser)
Router.get('/:game_id', GameController.GetGameById)
Router.post('/:user_id', GameController.CreateGame)
Router.put('/:game_id', GameController.UpdateGame)
Router.delete('/:game_id', GameController.DeleteGame)

module.exports = Router