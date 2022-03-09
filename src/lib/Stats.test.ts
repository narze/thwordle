import {
  calculateGamesCount,
  calculateWinPercentage,
  calculateCurrentStreak,
  calculateMaxStreak,
  calculateGuessDistribution,
} from "./Stats"

describe("calculateGamesCount", () => {
  it("counts if win", () => {
    const data = {
      "1": {
        win: true,
        lose: false,
      },
    }

    expect(calculateGamesCount(data)).toEqual(1)
  })

  it("counts if lose", () => {
    const data = {
      "1": {
        win: false,
        lose: true,
      },
    }

    expect(calculateGamesCount(data)).toEqual(1)
  })

  it("does not count if neither win nor lose", () => {
    const data = {
      "1": {
        win: false,
        lose: false,
      },
    }

    expect(calculateGamesCount(data)).toEqual(0)
  })

  it("returns number of games played, determined by win / lose", () => {
    const data = {
      "1": {
        win: true,
        lose: false,
      },
      "2": {
        win: false,
        lose: true,
      },
      "3": {
        win: false,
        lose: false,
      },
    }

    expect(calculateGamesCount(data)).toEqual(2)
  })
})

describe("calculateWinPercentage", () => {
  it("return 0 if did't play at all", () => {
    const data = {
      "1": {
        win: false,
        lose: false,
      },
    }

    expect(calculateWinPercentage(data)).toEqual(0)
  })

  it("returns 0 if lose all games", () => {
    const data = {
      "1": {
        win: false,
        lose: true,
      },
      "2": {
        win: false,
        lose: true,
      },
    }

    expect(calculateWinPercentage(data)).toEqual(0)
  })

  it("returns 50 if win 1 & lose 1", () => {
    const data = {
      "1": {
        win: false,
        lose: true,
      },
      "2": {
        win: true,
        lose: false,
      },
    }

    expect(calculateWinPercentage(data)).toEqual(50)
  })

  it("returns 100 if win all games", () => {
    const data = {
      "1": {
        win: true,
        lose: false,
      },
      "2": {
        win: true,
        lose: false,
      },
      "3": {
        win: false,
        lose: false,
      },
    }

    expect(calculateWinPercentage(data)).toEqual(100)
  })
})

describe("calculateCurrentStreak", () => {
  it("returns 0 if not played at all", () => {
    const data = {
      "1": {
        win: false,
        lose: false,
      },
      "2": {
        win: false,
        lose: false,
      },
    }

    expect(calculateCurrentStreak(data)).toEqual(0)
  })

  it("returns 0 if lose the last game", () => {
    const data = {
      "1": {
        win: true,
      },
      "2": {
        lose: true,
      },
    }

    expect(calculateCurrentStreak(data)).toEqual(0)
  })

  it("does not count if last date is not played yet", () => {
    const data = {
      "1": {
        win: true,
      },
      "2": {
        win: true,
      },
      "3": {
        win: false,
        false: false,
      },
    }

    expect(calculateCurrentStreak(data)).toEqual(2)
  })

  it("resets if second to last date is not played yet", () => {
    const data = {
      "1": {
        win: true,
      },
      "2": {
        win: true,
      },
      "3": {
        win: false,
        false: false,
      },
      "4": {
        win: false,
        false: false,
      },
    }

    expect(calculateCurrentStreak(data)).toEqual(0)
  })

  it("returns number of latest win streaks", () => {
    const data = {
      "1": {
        lose: true,
      },
      "2": {
        win: true,
      },
      "3": {
        lose: true,
      },
      "4": {
        win: true,
      },
      "5": {
        win: true,
      },
    }

    expect(calculateCurrentStreak(data)).toEqual(2)
  })
})

describe("calculateMaxStreak", () => {
  it("return 0 if did't play at all", () => {
    const data = {
      "1": {
        win: false,
        lose: false,
      },
    }

    expect(calculateMaxStreak(data)).toEqual(0)
  })

  it("returns 0 if lose all games", () => {
    const data = {
      "1": {
        win: false,
        lose: true,
      },
      "2": {
        win: false,
        lose: true,
      },
    }

    expect(calculateMaxStreak(data)).toEqual(0)
  })

  it("returns max win streaks (2 days)", () => {
    const data = {
      "1": {
        win: true,
      },
      "2": {
        lose: true,
      },
      "3": {
        win: true,
      },
      "4": {
        win: true,
      },
      "5": {
        lose: true,
      },
    }

    expect(calculateMaxStreak(data)).toEqual(2)
  })

  it("returns max win streaks (2 days)", () => {
    const data = {
      "1": {
        win: true,
      },
      "2": {
        win: true,
      },
      "3": {
        win: false,
        lose: false,
      },
      "4": {
        win: true,
      },
      "5": {
        win: true,
      },
      "6": {
        win: true,
      },
      "7": {
        lose: true,
      },
    }

    expect(calculateMaxStreak(data)).toEqual(3)
  })
})

describe("calculateGuessDistribution", () => {
  it("returns array with 7 elements", () => {
    const data = {
      incompleted_1: {
        attempts: ["foo"],
        win: false,
        lose: false,
      },
      win_1: {
        attempts: ["foo"],
        win: true,
      },
      win_2: {
        attempts: ["bar", "baz"],
        win: true,
      },
      win_4: {
        attempts: ["bar", "baz", "foo", "foo"],
        win: true,
      },
      win_4b: {
        attempts: ["bar", "baz", "foo", "foo"],
        win: true,
      },
      lose_1: {
        attempts: ["bar", "baz"],
        lose: true,
      },
      win_6: {
        attempts: ["bar", "baz", "foo", "foo", "foo", "foo"],
        win: true,
      },
      lose_2: {
        attempts: ["bar", "baz"],
        lose: true,
      },
    }

    expect(calculateGuessDistribution(data).length).toEqual(7)
    expect(calculateGuessDistribution(data)).toEqual([1, 1, 0, 2, 0, 1, 2])
  })
})
