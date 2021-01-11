const Router = require('express').Router()
const QuestionController = require('../controllers/QuestionController')

Router.get('/:category_id', QuestionController.GetQuestionsByCategory)
Router.post('/:category_id', QuestionController.CreateQuestion)
Router.put('/:question_id', QuestionController.UpdateQuestion)
Router.delete('/:question_id', QuestionController.DeleteQuestion)

module.exports = Router