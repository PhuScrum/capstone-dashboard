const { format } = require("util");
const {BigQuery} = require('@google-cloud/bigquery');
const path = require('path');

const api =  (req, res) => {
  const bucket = req.bucket;
  const bigquery = req.bigquery;
  const file = req.file;

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(`dataset/${file.filename}`);
  const blobStream = blob.createWriteStream({
    public: true,
    metadata: {
      contentType: req.file.mimetype
    },
    resumable: false
  });

  blobStream.on("error", (err) => {
    res.status(401).json(err);
  });

  blobStream.on("finish", async () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );

    const metadata = {
      sourceFormat: 'CSV',
      skipLeadingRows: 1,
      location: 'asia-southeast1'
    }

    const name = path.parse(file.originalname).name

    //Load datas from GCS to bigquery table
    const [job] = await bigquery
      .dataset('capstone_rmit2020')
      .table(name)
      .load(bucket.file(blob.name), metadata)
    
    console.log(`${job.id} completed`)

    res.json({
      file: req.file,
      url: publicUrl,
    });
  });

  blobStream.end(req.file.buffer);

  // res.json(req.file)
};

module.exports = api;
