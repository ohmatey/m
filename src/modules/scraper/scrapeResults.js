const cheerio = require('cheerio')
const request = require('request')

const makeDoubleDigit = require('../../utils/makeDoubleDigit')

const { MUAY_999_URL } = process.env
console.log(`${MUAY_999_URL}program_result.php?d=01&m=3`)
const scrapeResults = ({
  day,
  month
}) => new Promise((resolve, reject) => {
  request(`${MUAY_999_URL}program_result.php?d=${makeDoubleDigit(day)}&m=${makeDoubleDigit(month)}`, (error, response, html) => {
    if (error) {
      reject(error)
    }

    const $ = cheerio.load(html);
    const schedule = {
      fighters: [],
      showNames: [],
      shows: []
    }
    let showName = ''

    $('tr').each((index, el) => {
      const $row = $(el)
      const rowClass = $row.attr('class')

      if (rowClass === 'muay-head') {
        showName = $row.find('td').text().trim()
        schedule.shows[showName] = []
        schedule.showNames.push(showName)

      } else if (rowClass !== 'muay-head2') {
        const fight = $row.find('td').eq(1).text().trim()
        const fightNumber = $row.find('td').eq(0).text().trim()
        const redCornerName = $row.find('td').find('.font-red').text().trim()
        const blueCornerName = $row.find('td').find('.font-blue').text().trim()
        const winner = $row.find('td').eq(2).text().trim()
        const result = $row.find('td').eq(3).text().trim()
        const finalResult = result === '-' ? 'Decision' : result

        // push list of fighters
        schedule.fighters.push(redCornerName)
        schedule.fighters.push(blueCornerName)

        schedule.shows[showName].push({
          matchUp: fight,
          redCorner: {
            name: redCornerName,
            win: winner === 'แดงชนะ'
          },
          blueCorner: {
            name: blueCornerName,
            win: winner === 'น้ำเงินชนะ'
          },
          winner: winner === 'แดงชนะ' ? redCornerName : blueCornerName,
          winningCorner: winner === 'แดงชนะ' ? 'red': 'blue',
          result: finalResult
        })
      }
    })

    resolve(schedule)
  })
})

module.exports = scrapeResults
