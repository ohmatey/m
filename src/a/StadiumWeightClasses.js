'use strict'

module.exports = (sequelize, DataTypes) => {
  const StadiumWeightClasses = sequelize.define('StadiumWeightClasses', {
    // name: DataTypes.STRING
  })

  StadiumWeightClasses.associate = models => {
    models.StadiumWeightClasses.belongsTo(models.Fighters, {
      foreignKey: 'championFighterId'
    })
  }

  return StadiumWeightClasses
}
