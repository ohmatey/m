const FightersModel = require('../../models/').Fighters
const FightsModel = require('../../models/').Fights
const Fights = require('../fights/')

const fighters = async fighter => {
  let fighterId = null
  let fighterObj = {}

  const getFighterById = id => new Promise((resolve, reject) => {
    FightersModel.findById(id, {
      include: [
        { model: FightsModel, where: { redCornerFighterId: id } }
      ]
    }).then((a,b) => {

      console.log('ad', a,b)
      // resolve(fight.get({
      //   plain: true
      // }))
    })
    .catch(reject)
  })

  const saveFighter = ({ name }) => new Promise((resolve, reject) => {
    FightersModel.findOrCreate({where: {
      name
    }}).spread((fighter, created) => {
      resolve(fighter.get({
        plain: true
      }))
    })
    .catch(reject)
  })

  const getFightsForFighter = async _ => {
    const fights = await Fights().findFightsForFighter(fighterId)
    fighterObj.fights = fights

    return fights
  }

  const saveAllFighters = fighters => {
    const saveFightersPromises = fighters.map(fighter => saveFighter({ name: fighter }))

    return Promise.all(saveFightersPromises)
  }

  if (typeof fighter === 'number') {
    fighterObj = await getFighterById(fighter)
  } else if (typeof fighter === 'string') {
    fighterObj = await saveFighter(fighter)
  }
  fighterId = fighterObj.id

  return {
    fighterId,
    saveFighter,
    saveAllFighters,
    fighterObj
  }
}

module.exports = fighters
