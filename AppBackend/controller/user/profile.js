const db = require('../../dbConfig')
const { authClient } = require('../../middlewares/auth')

const getProfile = async (req,res) => {
    const { q } = db;
    const currentAuth = authClient(req.headers.secret)

    const {id} = req.params;
    try {
        const dbs = await currentAuth.query(
            q.Get(
                q.Ref(
                    q.Collection("users"), `${id}`
                )
            )
        )
        //ok
        res.status(200).json(dbs.data)
    } catch(e) {
        // something went wrong
        res.status(500).json({ error: e.message })
    }
}

module.exports = getProfile;