const { Schema } = require('mongoose')

module.exports = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        game_id: {
            type: Schema.Types.ObjectId,
            ref: 'games'
        },
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'questions'
            }
        ]
    },
    { timestamps: true }
)