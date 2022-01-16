export enum CharState {
  Correct = 0,
  OutOfPlace,
  Wrong,
  NotUsed,
}

export function splitWord(word: string) {
  const alphas = word.split("")
  const out = []

  alphas.forEach((a) => {
    // ถ้าตัวอักษรเป็นตัวตรงกลาง ให้ถือเป็นตัวใหม่
    if (a.match(/[ก-ฮa-zA-Z]/) || a.match(/[ใเแโไาำะๆฯฤา]/)) {
      out.push(a)
    } else {
      // ถ้าเป็นสระบนล่าง หรือวรรณยุกต์ ให้ต่อท้ายตัวเดิม
      out[out.length - 1] += a
    }
  })

  return out
}

export function normalizeWord(word: string) {
  return word.replace(/[^ก-ฮใเแโไาำะๆฯฤาa-zA-Z]/g, "")
}

export function validateWord(word: string, solution: string) {
  const wordSplitted = splitWord(word)
  const wordNormalizedSplitted = splitWord(normalizeWord(word))
  const solutionSplitted = splitWord(solution)
  const solutionNormalizedSplitted = splitWord(normalizeWord(solution))

  const output = solutionSplitted.map((s, idx) => {
    const sNormalized = solutionNormalizedSplitted[idx]
    const char = wordSplitted[idx]
    const cNormalized = wordNormalizedSplitted[idx]
    if (char === s || char === sNormalized) {
      return { correct: CharState.Correct, char: s }
    } else if (
      solutionSplitted.includes(char) ||
      solutionNormalizedSplitted.includes(cNormalized)
    ) {
      return { correct: CharState.OutOfPlace, char }
    } else {
      return { correct: CharState.Wrong, char }
    }
  })

  output.forEach((sol1) => {
    if (sol1.correct == CharState.Correct) {
      // Find OutOfPlace characters and make it wrong
      output.forEach((sol2, idx) => {
        if (
          (sol1.char == sol2.char || normalizeWord(sol1.char) == normalizeWord(sol2.char)) &&
          sol2.correct == CharState.OutOfPlace
        ) {
          output[idx] = { correct: CharState.Wrong, char: sol2.char }
        }
      })
    }
  })

  return output
}

export function layout(
  alphabets: string,
  validations: Array<{ correct: CharState; char: string }> = []
) {
  const layout: Record<string, CharState> = {}

  alphabets.split("").forEach((a, idx) => {
    layout[a] = CharState.NotUsed
  })

  validations.forEach(({ correct, char }) => {
    char.split("").forEach((c) => {
      if (correct < layout[c]) {
        // Correct < OutOfPlace < Wrong < Unused
        layout[c] = correct
      }
    })
  })

  return layout
}
