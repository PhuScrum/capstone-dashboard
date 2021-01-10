const path = require('path');
const db = require('../../../dbConfig')
const { authClient } = require('../../../middlewares/auth')

const api = async (req, res) => {
  //initialize query for faunaDb
  const { q, client } = db;

  //user authentication
  const currentAuth = authClient(req.headers.secret)

  //file info
  const {gcsUrl, fileName, originalname, version} = req.file

  try {
    const data = {
      url: gcsUrl,
      fileName: fileName,
      originalName: originalname,
      version: version,
      note: req.body.note,
      user: req.authUserId
    }


    const dbs = await client.query(
      q.Create(
        q.Collection('datasets'),
        {
          data: data
        }
      )
    )
    
    //ok
    res.json(dbs)

  } catch(err) {
    return res.status(500).json({ error: err.message })
  }

};

module.exports = api;
