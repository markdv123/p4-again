const { Game, Category, Question } = require('../db/schema')

const GetGames = async (req, res) => {
    try {
        const { page, limit } = req.query
        const offset = page === '1' ? 0 : Math.floor(parseInt(page) * parseInt(limit))
        const games = await Game.find()
            .limit(parseInt(limit))
            .skip(offset)
            .sort({ popularity_rating: 'desc' })
        res.send({ results: games.length, games })
    } catch (err) {
        throw err
    }
}

const GetGamesByUser = async (req, res) => {
    try {
        const { page, limit } = req.query
        const offset = page === '1' ? 0 : Math.floor(parseInt(page) * parseInt(limit))
        const games = await Game.find({ user_id: req.params.user_id })
            .limit(parseInt(limit))
            .skip(offset)
            .sort({ popularity_rating: 'desc' })
        res.send({ results: games.length, games })
    } catch (err) {
        throw err
    }
}

const GetGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.game_id).populate([
            {
                model: 'users',
                path: 'user_id',
                select: '_id name'
            },
            {
                model: 'categories',
                path: 'categories',
                populate: {
                    model: 'questions',
                    path: 'questions'
                }
            }
        ])
        res.send(game)
    } catch (err) {
        throw err
    }
}

const CreateGame = async (req, res) => {
    try {
        const game = new Game({ ...req.body, user_id: req.params.user_id })
        game.save()
        res.send(game)
    } catch (err) {
        throw err
    }
}

const DeleteGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.game_id)
        await Category.deleteMany({ _id: { $in: game.categories } })
        await Question.deleteMany({ _id: { $in: game.questions } })
        await Game.findByIdAndDelete(req.params.game_id)
        res.send({ msg: `${game.title} deleted` })
    } catch (err) {
        throw err
    }
}

const UpdateGame = async (req, res, err) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.game_id,
            { ...req.body },
            { new: true, useFindAndModify: false },
            (err, (d) => (err ? err : res.send(d)))
        )
        res.send(updatedGame)
    } catch (err) {
        throw err
    }
}

module.exports = {
    GetGames,
    GetGameById,
    GetGamesByUser,
    CreateGame,
    UpdateGame,
    DeleteGame
}