'use strict'

module.exports = (sequelize, DataTypes) => {
  const WeightClasses = sequelize.define('WeightClasses', {
    name: DataTypes.STRING
  })

  WeightClasses.associate = models => {
    models.WeightClasses.belongsToMany(models.Stadiums, {
      through: models.StadiumWeightClasses
    })
  }

  return WeightClasses
}
