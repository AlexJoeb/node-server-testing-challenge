const router = require('express').Router();
const db = require('../data/db-helper');

const {
    validateUpdate
} = require('./UserValidations');

router.get('/', (req, res) => {
    return db.getAllUsers()
        .then(users => res.status(200).json({
            message: 'Presenting all users.',
            users,
        }))
        .catch(error => res.status(500).json(error));
});

router.get('/:id', (req, res) => {
    return db.getUserByID(req.params.id)
        .then(user => user ? res.status(200).json({
            message: `Presenting user with ID: ${req.params.id}`,
            user,
        }) : res.status(404).json({ message: `User not found.` }))
        .catch(error => res.status(500).json(error));
});

router.put('/:id', validateUpdate, (req, res) => {
    return db.updateUser(req.params.id, req.user)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error));
})

router.delete('/:id', (req, res) => {
    return db.removeUser(req.params.id)
        .then(res => res.status(200).json({ message: `Succesfully removed ID: ${req.params.id}` }))
        .catch(error => res.status(500).json(error));
})

module.exports = router;  