const express = require('express')

const models = require('./models/')

const schedule = require('./modules/schedule/')
const Fighters = require('./modules/fighters/')
const scraper = require('./modules/scraper/')

const app = express()

app.get('/', (req, res) => res.send('Hello Worlds!'))

app.get('/api/s', async (req, res) => {
  const scheduler = schedule()

  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1

  const scrapedSchedule = await scraper().scrapeResults({
    day,
    month
  })



  const a = await scheduler.saveResults(scrapedSchedule)

  

  res.json(a)
})

module.exports = app
