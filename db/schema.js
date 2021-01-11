const { model } = require('mongoose')

const UserSchema = require('./models/User')
const GameSchema = require('./models/Game')
const CategorySchema = require('./models/Category')
const QuestionSchema = require('./models/Question')

const User = model('users', UserSchema)
const Game = model('games', GameSchema)
const Category = model('categories', CategorySchema)
const Question = model('questions', QuestionSchema)

module.exports = {
    User,
    Game,
    Category,
    Question
}