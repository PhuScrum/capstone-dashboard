const { format } = require("util");
const {BigQuery} = require('@google-cloud/bigquery');
const path = require('path');

const api = (req, res) => {

  if (req.file && req.file.gcsUrl) {
    return res.json({url: req.file.gcsUrl});
  }

  return res.status(500).send('Unable to upload');

};

module.exports = api;
