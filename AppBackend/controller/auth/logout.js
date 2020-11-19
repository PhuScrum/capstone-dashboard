const { q } = require('../../dbConfig')
const { authClient } = require('../../middlewares/auth')

const logout = async (req, res) => {
    const currentAuth = authClient(req.headers.secret)
    try {
        const dbs = await currentAuth.query(
            q.Logout(true)
        )
        
        //ok
        res.status(200).json(dbs)
        
    } catch(e) {
        res.status(500).json({ error: e.message })
    }
}

module.exports = logout;