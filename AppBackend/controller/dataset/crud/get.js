const csv = require('csv-parser');
const neatCsv = require('neat-csv');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../../../files/dataset/weather/');

const api = async (req, res) => {
    let dataset_data = [];

    fs.readdir(directoryPath, (err, files) =>{
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            var datasetSize
            let filePath = directoryPath + file
            var filename = path.basename(filePath, '.csv')

            const test = fs.readFile(filePath, async (err, data) => {
                if(err) {
                    console.log(err)
                    return
                }
                const neatData = await neatCsv(data)
                return datasetSize = neatData.length
            })
            console.log(test)

        });
        res.json('get')
        
    });
    
}

module.exports = api;