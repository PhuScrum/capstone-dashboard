const csv = require('csv-parser');
const neatCsv = require('neat-csv');
const fs = require('fs');
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

const api = async (req, res) => {
    const bucket = req.bucket

//    const [gcpFiles] = await bucket.getFiles()
//    gcpFiles.forEach(async file => {
//     // fs.readFile(file, 'utf8', function (err,data) {
//     //     if (err) {
//     //       return console.log(err);
//     //     }
//     //     console.log(data);
//     //   });
// //     const content = await file.download(async function(err, contents) {
// //         console.log("file err: "+err);  
// //         console.log("file data: "+contents);
// //    });
//     console.log(file)

//    });
    const gcpFile = bucket.file('dataset/Temp_Min_Daily_CroplandFiltered_States_GOOD_all-1609840499916.csv')
    let buffer = '';
    // gcpFile.createReadStream()
    // .on('error', function(err) {console.log(err)})
    // .on('data', function(response) {
    //     buffer += response
    //     console.log(buffer)
    // })
    // .on('end', function() {
        
    //     // res.send(buffer);
    // })

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