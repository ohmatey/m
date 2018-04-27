'use strict'

module.exports = (sequelize, DataTypes) => {
  const Fighters = sequelize.define('Fighters', {
    name: DataTypes.STRING
  })

  Fighters.associate = models => {
    // models.Fighters.hasMany(models.StadiumWeightClasses, {
    //   foreignKey: 'championFighterId'
    // })

    models.Fighters.hasMany(models.Fights, {
      foreignKey: 'blueCornerFighterId'
    })

    models.Fighters.hasMany(models.Fights, {
      foreignKey: 'redCornerFighterId'
    })
  }

  return Fighters
}
