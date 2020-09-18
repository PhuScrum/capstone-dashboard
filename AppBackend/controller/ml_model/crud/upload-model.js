const uploadModel = (req, res)=>{
    console.log(req.file)
    res.json(req.file)
}

module.exports =  uploadModel