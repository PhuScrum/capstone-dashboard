const { q, client } = require('../../dbConfig')
const { authClient } = require('../../middlewares/auth')

const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const dbs = await client.query(
            q.Login(
                q.Match( q.Index("users_by_email"),  username ),
                { password }
            )
        )

        const user = await authClient(dbs.secret).query(
            q.Get(
                q.Ref(
                    q.Collection("users"), `${dbs.instance.id}`
                )
            )
        )

        //ok
        res.status(200).json({
            ...dbs,
            user
        })
        
    } catch(e) {
        res.status(500).json({ error: e.message })
    }
}

module.exports = login;