const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const user = express.Router();

user.route('/')
    .get((req, res) => {
        User.find({}, (error, users) => {
            res.json(users)
        })  
    })
    .post(async (req, res) => {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.pin, 10, (error, hash) => {
              if (error) {
                  reject(error);
              }
              resolve(hash);
            });
          })

        try {
            const user = new User({username: req.body.username, pin: hashedPassword});
            const newUser = await user.save();
            res.status(201).send(newUser);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    user.route('/login')
    .post(async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            const match = await bcrypt.compare(req.body.pin, user.pin);

            if (match) {
                res.status(201).send(user);
            }
            else {
                res.status(401).json({ message: 'Incorrect pin.' });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

user.route('/:userId')
    .get((req, res) => {
        User.findById(req.params.userId, (err, user) => {
            res.status(201).send(user);
        }) 
    })

module.exports = user;