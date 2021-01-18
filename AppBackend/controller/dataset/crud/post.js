const path = require('path');
const db = require('../../../dbConfig')
const fs = require('fs') 
const csv = require('csv-parser');
const { Readable } = require('stream');


/**
 * Middleware for uploading file to GCS.
 * @param {Buffer} buffer
 * @return {Promise<{length: number, features: number}>}
 */
const getDesc = (buffer) => {
  //load csv info
  let size = 0
  let headerSize = 0
  let headerList = [];

  const stream = Readable.from(buffer.toString())

  return new Promise((resolve, reject) => {
    stream
    .pipe(csv())
    .on('headers', (headers) => {
      headerSize = headers.length
      headerList = headers
    })
    .on('data', row => size += 1)
    .on('error', reject)
    .on('end', () => resolve({
        // title: filename, 
        length: size, 
        features: headerSize,
        headers: headerList
    }))
  })

}

const api = async (req, res) => {
  //initialize query for faunaDb
  const { q, client } = db;

  //file info
  const {gcsUrl, fileName, originalname, version, date} = req.file

  try {
    const desc = await getDesc(req.file.buffer)
    const data = {
      url: gcsUrl,
      fileName: fileName,
      originalName: originalname,
      version: version,
      date: date,
      length: desc.length,
      features: desc.features,
      featureList: desc.headers,
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
