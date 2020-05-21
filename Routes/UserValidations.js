const db = require('../data/db-helper');
const bcrypt = require('bcryptjs');

const validateUser = async (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password) return res.status(400).json({ message: `Invalid POST request. Make sure 'username' and 'password' are in the body of the request.` });

    const exists = await db.getUserByName(req.body.username);
    if (exists) return res.status(400).json({ message: `Username already exists.` });

    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    
    req.user = req.body;
    next();
};

const validateUpdate = async (req, res, next) => {
    if (!req.body) return res.status(400).json({ message: `Nothing was provided in the body to update.` });
    if (!req.params.id || parseInt(req.params.id) <= 0) return res.status(400).json({ message: `A valid, positive integer, ID must be provided.` });
    if (!req.body.username && !req.body.password) return res.status(400).json({ message: `A username and/or password must be provided to update.` });

    if (req.body.username) {
        const exists = await db.getUserByName(req.body.username);
        if (exists) return res.status(400).json({ message: `Username already exists.` });
    }

    if (req.body.password) req.body.password = await bcrypt.hashSync(req.body.password, 10);

    req.user = req.body;
    next();
};

const validateLogin = async (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password) return res.status(400).json({ message: `Invalid POST request. Make sure 'username' and 'password' are in the body of the request.` });

    const user = await db.getUserByName(req.body.username);

    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

    const correctPassword = await bcrypt.compareSync(req.body.password, user.password);

    if (!correctPassword) return res.status(400).json({ message: 'Invalid credentials.' });

    req.user = user;
    next();
};

module.exports = {
    validateUser,
    validateUpdate,
    validateLogin
}