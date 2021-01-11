const { Schema } = require('mongoose')

module.exports = new Schema(
    {
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        points: {
            type: Number,
            required: true
        },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: 'categories'
        }
    },
    { timestamps: true }
)