const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../../../files/dataset/weather/');

const api = (req, res) => {
    let dataset_data = [];

    fs.readdir(directoryPath, (err, files) =>{
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            let datasetSize = 0;
            let filePath = directoryPath + file
            var filename = path.basename(filePath, '.csv')

            fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                datasetSize += 1;
            })
            .on('end', () => {
                console.log('data size: ', datasetSize);
                const datasetInfo = {
                    filename,
                    size: datasetSize
                }
    
                dataset_data.push(datasetInfo)
                res.json(dataset_data)
            });

            

            // var data = JSON.parse(fs.readFileSync(filePath));
            // model_data.push(data)
            // console.log(data)

        });
        
    });
    
}

module.exports = api;