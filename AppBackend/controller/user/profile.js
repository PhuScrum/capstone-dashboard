const db = require('../../dbConfig')

const getProfile = async (req,res) => {
    const { q, client } = db;

    const {id} = req.params;
    try {
        const dbs = await client.query(
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