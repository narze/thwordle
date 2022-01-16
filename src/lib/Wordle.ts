export enum CharState {
  Correct = 0,
  OutOfPlace,
  Wrong,
}

export function splitWord(word: string) {
  const alphas = word.split("")

  const out = []

  alphas.forEach((a) => {
    // if a is in a-z
    if (a.match(/[ก-ฮ]/) || a.match(/[ใเแโไาำะๆฯฤา]/)) {
      out.push(a)
    } else {
      // append to last element
      out[out.length - 1] += a
    }
  })

  return out
}

export function validateWord(word: string, solution: string) {
  const wordSplitted = splitWord(word)
  const solutionSplitted = splitWord(solution)

  return solutionSplitted.map((s, idx) => {
    const char = wordSplitted[idx]
    if (char === s) {
      return { correct: CharState.Correct, char }
    } else if (solutionSplitted.includes(char)) {
      return { correct: CharState.OutOfPlace, char }
    } else {
      return { correct: CharState.Wrong, char }
    }
  })
}
