const { q, client } = require('../../dbConfig')

const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const dbs = await client.query(
            q.Login(
                q.Match( q.Index("users_by_email"),  username ),
                { password }
            )
        )
        //ok
        res.status(200).json(dbs)
        
    } catch(e) {
        res.status(500).json({ error: e.message })
    }
}

module.exports = login;