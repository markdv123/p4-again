const express = require('express')
const path = require('path')
const AppRouter = require('./Routes/AppRouter')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const connection = require('./db/connection.js')

const PORT = process.env.PORT || 3001
const app = express()

app.use(logger('dev'))
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.disable('X-Powered-By')
app.get('/', (req, res) => res.send({ msg: 'Server Working' }))
app.use('/api', AppRouter)
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
)

app.listen(PORT, async () => {
  try {
    await connection
    console.log('Database Connected')
    console.log(`App listening on port: ${PORT}`)
  } catch (error) {
    throw new Error('Connection Error')
  }
})