const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        mode: {
            type: String,
            required: true
        },
        turn: {
            type: Number,
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    })

const Score = mongoose.model('Score', ScoreSchema)

module.exports = Score;