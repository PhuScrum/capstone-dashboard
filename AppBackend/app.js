const mongoose = require('mongoose')
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())

// const uri = "mongodb+srv://admin:123@cluster0-ym27l.mongodb.net/mtask-app?retryWrites=true";
// mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

const useCase_API = require('./controller/use_case')
const ml_model_API = require('./controller/ml_model')

//Test Server
app.get('/api', (req, res) => {
    res.status(200).send('Hello, world!').end();
  });

app.route('/api/model-data')
    .get(ml_model_API.crud.getModelData)


var port = process.env.PORT || 8080
  app.listen(port, () => {
    console.log('server running at port: ' + port)
  })