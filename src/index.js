
const calculateDaysTillToday = require('./utils/calculateDaysTillToday')

// const scrapePromises = [...Array(calculateDaysTillToday()).keys()].map(i => {
//   return scrapeResults({
//     day: i <= 10 ? `0${i}` : i,
//     month: '12'
//   })
// })


const app = require('./app')
const debug = require('debug')('express-sequelize')
const http = require('http')

const models = require('./models/')

const server = http.createServer(app)

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DATABASE
} = process.env

const Sequelize = require('sequelize')

// Or you can simply use a connection uri
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false
})

const port = '3000'

app.set('port', port)

models.sequelize
  // .authenticate()
  .sync({ force: true })
  .then(_ => {
    console.log('Connection has been established successfully.')
    server.listen(port, async () => {
      console.log('Express server listening on port ' + server.address().port)
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
