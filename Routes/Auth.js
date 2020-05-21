const router = require('express').Router();
const db = require('../data/db-helper');

const {
    validateLogin,
    validateUser
} = require('./UserValidations');

router.post('/login', validateLogin, (req, res) => {
    const { user } = req;
    return res.status(200).json({
        message: `Welcome back, ${user.username}!`,
        token
    });
});

router.post('/register', validateUser, (req, res) => {
    const { user } = req;

    return db.newUser(req.user)
        .then(resp => res.status(201).json({
            message: `${user.username} created successfully.`,
            user,
        }))
        .catch(error => res.status(500).json(error));
});

module.exports = router; 