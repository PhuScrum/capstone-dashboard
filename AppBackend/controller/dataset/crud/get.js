const csv = require('csv-parser');
const neatCsv = require('neat-csv');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../../../files/dataset/weather/');

const getDesc = (filePath = new String, extension = new String) => {
    let size = 0;
    let headerSize = 0;
    var filename = path.basename(filePath, extension)
    let stream = fs.createReadStream(filePath)

    return new Promise((resolve, reject) => {
        stream.pipe(csv())
        .on('headers', (headers) => headerSize = headers.length)
        .on('data', row => size += 1)
        .on('error', reject)
        .on('end', () => resolve({
            title: filename, length: size, features: headerSize
        }))
    })
}

const api = async (req, res) => {
    let dataset_data = [];
    fs.readdir(directoryPath, async (err, files) =>{
        const numberOfFiles = files.length;
        console.log(numberOfFiles)
        //handling error
        if (err) {
            console.log('Unable to scan directory: ' + err);
            return res.status(500).json(err)
        }

        for (let i = 0; i < numberOfFiles; i++) {
            let file = files[i]
            let filePath = directoryPath + file
            const data = await getDesc(filePath, '.csv')
            const final_data = {...data, key: i, description: 'Irem losum'}
            dataset_data.push(final_data)
        }
        res.json(dataset_data)
    });
    
}

module.exports = api;