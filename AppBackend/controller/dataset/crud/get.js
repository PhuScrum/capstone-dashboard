const csv = require('csv-parser');
const fs = require('fs');

const api = (req, res) => {
    fs.createReadStream('files/dataset/weather/Rain_Daily_CroplandFiltered_Broadacre_GOOD_all.csv')
    .pipe(csv())
    .on('data', (row) => {
        // console.log(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
    res.json('get')
}

module.exports = api;