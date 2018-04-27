'use strict'

module.exports = (sequelize, DataTypes) => {
  const Fights = sequelize.define('Fights', {
    name: DataTypes.STRING,
    result: DataTypes.STRING
  })

  Fights.associate = models => {
    models.Fights.belongsTo(models.Fighters, {
      foreignKey: 'blueCornerFighterId',
      as: 'blue_corner'
    })
    models.Fights.belongsTo(models.Fighters, {
      foreignKey: 'redCornerFighterId',
      as: 'red_corner'
    })

    // models.Fights.belongsTo(models.Fighters, {
    //   foreignKey: 'winnerFighterId'
    // })

    models.Fights.belongsTo(models.Shows)
  }

  return Fights
}
