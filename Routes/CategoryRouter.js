const Router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')

Router.get('/:game_id', CategoryController.GetCategoriesByGame)
Router.post('/:game_id', CategoryController.CreateCategory)
Router.put('/:category_id', CategoryController.UpdateCategory)
Router.delete('/:category_id', CategoryController.DeleteCategory)

module.exports = Router