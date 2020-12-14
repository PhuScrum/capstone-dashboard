const api = (req, res) => {
    const {name} = req.query
    console.log(name)
    res.json('get by name')
}

module.exports = api;