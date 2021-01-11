const db = require('../../../dbConfig')
// const bucket = require('../../../middlewares/google-cloud-storage').bucket

const getModelData = async (req, res)=>{
    // let model_data = []
    // fs.readdir(directoryPath,  async (err, files) =>{
    //     //handling error
    //     if (err) {
    //         return console.log('Unable to scan directory: ' + err);
    //     } 
    //     //listing all files using forEach
    //     await files.forEach(function (file) {
    //         // Do whatever you want to do with the file
    //         // console.log(file); 
    //         let filePath = directoryPath + file
    //         var data = JSON.parse(fs.readFileSync(filePath));
    //         model_data.push(data)
    //         // console.log(data)
    //     });
    //     res.json(model_data)
    // });

    const { q, client } = db;
    
    try {
        const dbs = await client.query(
            q.Map(
                // iterate each item in result
                q.Paginate(
                    // make paginatable
                    q.Match(
                        // query index
                        q.Index('all_models')
                    )
                ),
                // ref => q.Get(ref) // lookup each result by its reference
                q.Lambda("X", q.Get(q.Var("X")))// lookup each result by its reference
            )
        )
        const datasets = dbs.data.map(item => item.data)
        // ok
        res.status(200).json(datasets)
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message })
    }


}

module.exports = getModelData