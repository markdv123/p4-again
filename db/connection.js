const mongoose = require('mongoose')
require('dotenv').config()

const connection = mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : 'mongodb://localhost:27017/p4', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

mongoose.set('debug', true)

module.exports = connection
