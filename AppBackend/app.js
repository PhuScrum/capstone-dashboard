const mongoose = require('mongoose')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())

//Morgan middleware
app.use(morgan('dev'))

// const uri = "mongodb+srv://admin:123@cluster0-ym27l.mongodb.net/mtask-app?retryWrites=true";
// mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

//Test Server
app.get('/api', (req, res) => {
    
    res.status(200).send('Hello, world!').end();
  });

const ml_model = require('./routes/ml_model')
const auth = require('./routes/auth')
const user = require('./routes/user')
const dataset = require('./routes/datasets')
app.use('/api/model-data', ml_model)
app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/dataset', dataset)

// app.route('/api/model-data')
//     .get(ml_model_API.crud.getModelData)
//     .post(upload.single('modelData'), ml_model_API.crud.uploadModel)

var port = process.env.PORT || 8080
  app.listen(port, () => {
    console.log('server running at port: ' + port)
  })