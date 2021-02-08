const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../../../files/dataset/weather/');

const api = (req, res) => {
    const {id} = req.params;
    const data = [];
    let dataHeaders = [];
    
    const filePath = directoryPath + id + '.csv';

    let stream = fs.createReadStream(filePath)

    stream.pipe(csv())
    .on('headers', (headers) => dataHeaders = headers)
    .on('data', row => data.push(row))
    .on('end',()=> {
        res.json({
            headers: dataHeaders,
            data
        })
    })    
}

module.exports = api