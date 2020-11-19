const { q, client } = require('../dbConfig')

exports.authMiddleware = async (req, res, next) => {
    try {
        const authCheck = await client.query(
            q.KeyFromSecret(req.headers.secret)
        )
        console.log(authCheck)
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