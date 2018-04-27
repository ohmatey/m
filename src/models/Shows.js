'use strict'

module.exports = (sequelize, DataTypes) => {
  const Shows = sequelize.define('Shows', {
    name: DataTypes.STRING
  })

  Shows.associate = models => {
    models.Shows.hasMany(models.Fights)
    // models.Shows.belongsTo(models.Stadiums)
  }

  return Shows
}
