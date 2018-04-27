const calculateDaysTillToday = _ => {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const timeInMilisec = today.getTime() - startOfMonth.getTime()
  const differenceDays = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24))

  return differenceDays
}

module.exports = calculateDaysTillToday
