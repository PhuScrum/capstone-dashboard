const api = (req, res) => {
    if(req.err) return res.status(500).json(req.err);
    else {
        const {date, version, fileName, gcsUrl} = req.file;
        return res.status(200).json({
            date: date,
            version: version,
            fileName: fileName,
            gcsUrl: gcsUrl
        })
    }
}

module.exports = api;