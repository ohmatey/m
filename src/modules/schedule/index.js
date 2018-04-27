const Fighters = require('../fighters/')
const Fights = require('../fights/')()
const Shows = require('../Shows/')()


const schedule = () => {

  const saveResults = async ({ fighters, shows }) => {
    return Object.keys(shows).map(async (showName) => {
      const show = shows[showName]
      const showDB = await Shows.saveShow({
        name: showName
      })

      return show.map(async ({
        matchUp,
        redCorner,
        blueCorner,
        winner,
        winningCorner,
        result
      }) => {
        try {
          const blueCornerDB = await Fighters(blueCorner.name)
          const redCornerDB = await Fighters(redCorner.name)

          const blueCornerId = blueCornerDB.fighterId
          const redCornerId = redCornerDB.fighterId

          let winnerFighterId = null
          if (winningCorner === 'blue') {
            winnerFighterId = blueCornerId
          } else if (winningCorner === 'red') {
            winnerFighterId = redCornerId
          }

          const newFight = await Fights.saveFight({
            name: matchUp,
            blueCornerFighterId: blueCornerId,
            redCornerFighterId: redCornerId,
            showId: showDB.id,
            result,
            winnerFighterId
          })

          return newFight.get({
            plain: true
          })
        } catch (e) {
          console.log(e)
        }
      })
    })
  }

  return {
    saveResults
  }
}

module.exports = schedule
