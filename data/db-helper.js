// * Knex Database (DBMS)
const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config[process.env.ENV || 'development']);

const getAllUsers = () => db('users as u')
    .select('u.id', 'u.username');

const getUserByID = id => db('users as u')
    .where('u.id', id)
    .select('u.id', 'u.username')
    .first();

const getUserByName = name => db('users as u')
    .where('u.username', name)
    .select('u.id', 'u.username')
    .first();

const newUser = user => db('users')
    .insert(user)
    .then(([id]) => getUserByID(id))
    .catch(error => error);

const removeUser = id => db('users')
    .where({ id })
    .del();

const updateUser = (id, update) => db('users')
    .where({ id })
    .update(update)
    .then(resp => resp)
    .catch(error => error);

module.exports = {
    getAllUsers,
    getUserByID,
    getUserByName,
    newUser,
    removeUser,
    updateUser,
}; 