'use strict'

module.exports = (sequelize, DataTypes) => {
  const Stadiums = sequelize.define('Stadiums', {
    name: DataTypes.STRING
  })

  Stadiums.associate = models => {
    models.Stadiums.hasMany(models.Shows)
    models.WeightClasses.belongsToMany(models.Stadiums, {
      through: 'stadiumWeightClasses'
    })
  }

  return Stadiums
}
