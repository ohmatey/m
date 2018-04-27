const Shows = require('../../models/').Shows

const shows = () => {

  const saveShow = ({ name }) => new Promise((resolve, reject) => {
    Shows.findOrCreate({where: {
      name
    }}).spread((show, created) => {
      resolve(show.get({
        plain: true
      }))
    })
    .catch(reject)
  })

  const saveAllShows = shows => {
    const saveShowsPromises = Object.keys(shows).map(show => saveShow({ name: show }))

    return Promise.all(saveShowsPromises)
  }

  return {
    saveShow,
    saveAllShows
  }
}

module.exports = shows
