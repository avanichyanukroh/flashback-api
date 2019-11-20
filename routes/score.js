const express = require('express');
const Score = require('../models/Score');

const score = express.Router();

score.route('/:mode')
    .get(async (req, res) => {
        const scores = await Score.find({mode: req.params.mode}).sort({score: 1});

        try {
            res.status(201).send(scores);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    .post(async (req, res) => {
        const newScore = new Score({
            userId: req.body.userId,
            mode: req.body.mode,
            turn: req.body.turn,
            time: req.body.time,
            score: req.body.score
        });
        newScore.save();
        res.status(201).send(newScore);
    })

score.route('/highScore/:userId/:mode')
    .get(async (req, res) => {
        const score = await Score.findOne({userId: req.params.userId, mode: req.params.mode});
        try {
            res.status(201).send(score);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    .post(async (req, res) => {
        const score = await Score.findOne({userId: req.params.userId, mode: req.body.mode});

        if (score) {
            score.turn = req.body.turn;
            score.time = req.body.time;
            score.score = req.body.score;

            const updatedScore = await score.save();

            try {
                res.status(201).send(updatedScore);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }

            
        }
        else {
            const score = new Score({
                userId: req.params.userId,
                mode: req.body.mode,
                turn: req.body.turn,
                time: req.body.time,
                score: req.body.score
            });
            const newScore = await score.save();
            res.status(201).send(newScore);
        }
        // try {
        //     res.status(201).send(score);
        // }
        // catch (error) {
        //     res.status(400).json({ message: error.message });
        // }
    })


module.exports = score;