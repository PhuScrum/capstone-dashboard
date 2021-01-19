const db = require('../../../dbConfig')
const slugify = require('slugify')

const api = async (req, res) => {
    //initialize query for faunaDb
    const { q, client } = db;

    //convert buffer to json
    const json = JSON.parse(req.file.buffer.toString());

    //file info
    const { gcsUrl, fileName, originalname, version, date } = req.file
    // const {r2_score, rmse, mse, mae, median_absolute_error, data_by_crops } = json;

    try {
        const data = {
            ...json,
            url: gcsUrl,
            fileName: fileName,
            originalName: originalname,
            slug: slugify(originalname).toLowerCase(),
            version: version,
            note: req.body.note,
            type: req.body.type,
            user: req.authUserId,
            date: date
        }

        const dbs = await client.query(
            q.Create(
                q.Collection('models'),
                {
                    data: data
                }
            )
        )

        //ok
        res.json(dbs)

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }

};

module.exports = api;
