const Router = require('express').Router()
const UserController = require('../controllers/UserController')
const {
    getToken,
    createToken,
    verifyToken
} = require('../middleware/JwtHandler')

Router.get('/:username', UserController.GetProfile)
Router.post('/register', UserController.CreateUser)
Router.post('/login', UserController.SignInUser, createToken)
Router.get(
    '/refresh/session',
    getToken,
    verifyToken,
    UserController.RefreshSession
)

module.exports = Router