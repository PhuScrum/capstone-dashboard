const csv = require('csv-parser');
const neatCsv = require('neat-csv');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../../../files/dataset/weather/');

const api = async (req, res) => {
    let dataset_data = [];
    let i = 0;

    fs.readdir(directoryPath, (err, files) =>{
        const numberOfFiles = files.length;
        console.log(numberOfFiles)
        //handling error
        if (err) {
            console.log('Unable to scan directory: ' + err);
            return
        }
        //listing all files using forEach
        files.forEach(function (file) {
            i+=1
            let datasetSize = 0;
            let filePath = directoryPath + file
            var filename = path.basename(filePath, '.csv')

            fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                datasetSize += 1;
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
            });
        });
        res.json('get')
        
    });
    
}

module.exports = api;