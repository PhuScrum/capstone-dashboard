const api = (req, res) => {
    console.log(req.file)
    res.json(req.file)
}

module.exports = api