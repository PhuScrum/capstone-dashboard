const get = require('./get');
const getById = require('./get-by-id');
const post = require('./post');
const edit = require('./edit');
const remove = require('./delete');
const getByName = require('./get-by-name');

module.exports = {
    get,
    getById,
    post,
    edit,
    remove,
    getByName
}