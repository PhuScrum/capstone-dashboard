const { q, client } = require('../dbConfig')
const faunadb = require('faunadb');

//this is to check the authentication for private apis
//if unauthenticated, the api will return errors
//else, proceed to next level
exports.authMiddleware = async (req, res, next) => {
    try {
        const authCheck = await client.query(
            q.KeyFromSecret(req.headers.secret)
        )

        //get the collection name
        const { instance } = authCheck
        const collection = JSON.parse(JSON.stringify(instance.collection))
        const collectionName = collection['@ref'].id

        // throw error if collection name is not 'users'
        if (collectionName !== 'users') throw res.status(500).json({ error: 'The token is invalid' })

        //ok
        req.authUserId = instance.id
        next()
    } catch(e) {
        res.status(500).json({ error: e.message })
    }
}

//some queries require only the Client secret
//this function is to generate the client secret
exports.authClient = (secret) => {
    return new faunadb.Client({secret})
}