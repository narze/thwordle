export function calculateGamesCount(data) {
  return Object.values(data).filter(({ win, lose }) => win || lose).length
}

export function calculateWinPercentage(data) {
  const gamesCount = calculateGamesCount(data)

  if (gamesCount == 0) return 0
  const winsCount = Object.values(data).filter(({ win }) => win).length
  return gamesCount ? Math.round((winsCount / gamesCount) * 100) : 0
}

export function calculateCurrentStreak(data) {
  const streaks = [0]
  let entries: [string, any][] = Object.entries(data)

  entries = entries.sort(([dayA], [dayB]) => +dayA - +dayB)

  const latestEntry = entries[entries.length - 1]
  if (!latestEntry[1].win && !latestEntry[1].lose) {
    delete entries[entries.length - 1]
  }

  entries.forEach(([day, { win, lose }]) => {
    if (win) {
      streaks[streaks.length - 1]++
    } else {
      streaks.push(0)
    }
  })

  return streaks[streaks.length - 1]
}
export function calculateMaxStreak(data) {
  const streaks = [0]
  let entries: [string, any][] = Object.entries(data)

  entries = entries.sort(([dayA], [dayB]) => +dayA - +dayB)

  entries.forEach(([day, { win, lose }]) => {
    if (win) {
      streaks[streaks.length - 1]++
    } else {
      streaks.push(0)
    }
  })

  return Math.max(...streaks)
}

export function calculateGuessDistribution(data) {
  const distribution = [0, 0, 0, 0, 0, 0, 0]

  Object.values(data).forEach(({ win, lose, attempts }) => {
    if (win) {
      distribution[attempts.length - 1]++
    } else if (lose) {
      distribution[6]++
    }
  })

  return distribution
}
