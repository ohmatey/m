const FightsModel = require('../../models/').Fights
const FightersModel = require('../../models/').Fighters
const Op = require('../../models/').Sequelize.Op

const fights = () => {

  const saveFight = ({
    name,
    blueCornerFighterId,
    redCornerFighterId,
    result,
    winnerFighterId,
    showId
  }) => {
    return FightsModel.create({
      name,
      blueCornerFighterId,
      redCornerFighterId,
      result,
      winnerFighterId,
      showId
    })
    .catch(console.log)
  }

  const saveAllFights = fights => {
    const saveFightsPromises = fights.map(fight => saveFight({ name: fight }))

    return Promise.all(saveFightsPromises)
  }

  const findFightsForFighter = fighterId => new Promise((resolve, reject) => {
    FightsModel.findAll({
      where: {
        [Op.or]: [{ blueCornerFighterId: fighterId }, { redCornerFighterId: fighterId }]
      }
    }).spread(fight => {
      resolve(fight.get({
        plain: true
      }))
    })
    .catch(reject)
  })

  const findFightById = id => new Promise((resolve, reject) => {
    FightsModel.findById(id, {
      include: [
        { model: FightersModel, as: 'blue_corner' },
        { model: FightersModel, as: 'red_corner' },
        FightersModel
      ]
    }).then(fight => {
      resolve(fight.get({
        plain: true
      }))
    })
    .catch(reject)
  })

  const findAll = _ => FightsModel.findAll({
    include: [
      { model: FightersModel, as: 'blue_corner' },
      { model: FightersModel, as: 'red_corner' }
    ]
  }).map(el => el.get({ plain: true }))

  return {
    saveFight,
    saveAllFights,
    findAll,
    findFightById,
    findFightsForFighter
  }
}

module.exports = fights

// setTimeout(async () => {
//   const fighter = await FightersModel.create({
//     name: 'aaro'
//   })
//
//   const fighterId = fighter.get({
//     plain: true
//   })
//
//   await fights().saveFight({
//     name: 'test12345123316',
//     blueCornerFighterId: fighterId.id,
//     redCornerFighterId: fighterId.id,
//     result: 'draw'
//   })
//
//   const f = await fights().findAll()
//   console.log(f)
// }, 10000)
