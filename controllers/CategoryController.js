const { Category, Game, Question } = require('../db/schema')

const GetCategoriesByGame = async (req, res) => {
    try {
        const categories = await Category.find({ game_id: req.params.game_id })
        res.send(categories)
    } catch (error) {
        throw error
    }
}

const CreateCategory = async (req, res) => {
    try {
        const category = new Category({ ...req.body, game_id: req.params.game_id })
        category.save()
        await Game.update(
            { _id: req.params.game_id },
            {
                $push: {
                    categories: category
                }
            }
        )
        res.send(category)
    } catch (err) {
        throw err
    }
}

const UpdateCategory = async (req, res) => {
    try {
        await Category.findByIdAndUpdate(
            req.params.category_id,
            { ...req.body },
            { upsert: true, new: true },
            (err, d) => (err ? err : res.send(d))
        )
    } catch (err) {
        throw err
    }
}

const DeleteCategory = async (req, res) => {
    try {
        const cat = await Category.findById(req.params.category_id)
        const game = await Game.findById(cat.game_id)
        await Category.deleteOne({ _id: req.params.category_id })
        await Question.deleteMany({ category_id: req.params.category_id })
        const updatedGame = await Game.findOneAndUpdate(
            { _id: cat.game_id },
            { $pull: { categories: req.params.category_id }},
            { upsert: true, new: true },
        )
        res.send({updatedGame})
    } catch (err) {
        throw err
    }
}

module.exports = {
    GetCategoriesByGame,
    CreateCategory,
    UpdateCategory,
    DeleteCategory
}