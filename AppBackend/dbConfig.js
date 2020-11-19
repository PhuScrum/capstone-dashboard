require('dotenv').config()

//connect to faunadb
const faunadb = require('faunadb');
const secret = process.env.FAUNADB_SECRET_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret }); //guest client

module.exports = {q, client};