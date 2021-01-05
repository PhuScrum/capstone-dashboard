const { format } = require("util");

const api =  (req, res) => {
  const bucket = req.bucket;
  const file = req.file


  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(`dataset/${file.filename}`);
  const blobStream = blob.createWriteStream({public: true});

  blobStream.on("error", (err) => {
    res.status(401).json(err);
  });

  blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.json({
      file: req.file,
      url: publicUrl,
    });
  });

  blobStream.end(req.file.buffer);

  // res.json(req.file)
};

module.exports = api;
