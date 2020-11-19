require('dotenv').config()

const key = 'fnAD7ADnJXACDd2V6pO3pXItGGVXn9FCIQVww8D0'

//connect to faunadb
const faunadb = require('faunadb');
const secret = key;
const q = faunadb.query;
const client = new faunadb.Client({ secret }); //guest client

module.exports = {q, client};