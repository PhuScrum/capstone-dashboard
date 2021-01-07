const csv = require('csv-parser');
const stream = require('stream')
const fs = require('fs');
const byline =require('byline');
const path = require('path');

const directoryPath = path.join(__dirname, '../../../files/dataset/');

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
            title: filename, 
            length: size, 
            features: headerSize
        }))
    })
}

const getGCP_CSV_DESCRIPTION = (bucketFile) => {
    const remoteFile = bucket.file(bucketFile.name)
}

const api = async (req, res) => {
    
    res.json(dataStream)

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
            //access filename and dateTime key
            let name = path.parse(file).name
            let name_parts = name.split('-')
            const filename = name_parts[0]
            const versionKey = name_parts[name_parts.length-1]

            const data = await getDesc(filePath, '.csv')
            
            const final_data = {
                ...data, key: i, filename, versionKey,
                description: 'Irem losum'
            }
            dataset_data.push(final_data)
        }
        res.json(dataset_data)
    });
}

module.exports = api;