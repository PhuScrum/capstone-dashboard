//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, '../../../files/models/');
//passsing directoryPath and callback function

const getModelData = async (req, res)=>{
    let model_data = []
    fs.readdir(directoryPath,  async (err, files) =>{
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        await files.forEach(function (file) {
            // Do whatever you want to do with the file
            // console.log(file); 
            let filePath = directoryPath + file
            var data = JSON.parse(fs.readFileSync(filePath));
            model_data.push(data)
            // console.log(data)
        });
        res.json(model_data)
    });
}

module.exports = getModelData