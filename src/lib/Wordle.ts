export enum CharState {
  Correct = 0,
  OutOfPlace,
  Wrong,
  NotUsed,
}

const emojiColors = {
  [CharState.Correct]: "🟩",
  [CharState.OutOfPlace]: "🟨",
  [CharState.Wrong]: "⬜",
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

function isUpperOrLowerCharacter(char: string): boolean {
  return !char.match(/[ก-ฮa-zA-Z]/) && !char.match(/[ใเแโไาำะๆฯฤา]/)
}

export function normalizeWord(word: string) {
  return word.replace(/[^ก-ฮใเแโไาำะๆฯฤาa-zA-Z]/g, "")
}

export function validateWord(word: string, solution: string) {
  const wordSplitted = splitWord(word)
  const wordNormalizedSplitted = splitWord(normalizeWord(word))
  const solutionSplitted = splitWord(solution)
  const solutionNormalizedSplitted = splitWord(normalizeWord(solution))

  // Falls back to wrong
  const output = wordSplitted.map((char) => ({ correct: CharState.Wrong, char }))

  // First Pass: Check correct character in correct place
  solutionSplitted.forEach((sChar, idx) => {
    const sNormalized = solutionNormalizedSplitted[idx]
    const char = wordSplitted[idx]
    const cNormalized = wordNormalizedSplitted[idx]

    // If matching character or normalized char, and in correct position
    if (char === sChar || cNormalized === sNormalized) {
      solutionSplitted[idx] = null
      solutionNormalizedSplitted[idx] = null
      wordSplitted[idx] = null
      wordNormalizedSplitted[idx] = null

      output[idx] = { correct: CharState.Correct, char: sChar }
    }
  })

  // Second Pass: Check out-of-place characters
  solutionSplitted.forEach((_sChar, idx) => {
    const char = wordSplitted[idx]

    if (char) {
      const cNormalized = wordNormalizedSplitted[idx]

      // If matching character or normalized char, and in correct position
      if (
        // If the solution has normalized char in other position, but only once
        solutionSplitted.includes(char) ||
        solutionNormalizedSplitted.includes(cNormalized)
      ) {
        // Remove one matching char from solution, so that it cannot be matched again
        const idx1 = solutionSplitted.indexOf(char)
        const idx2 = solutionNormalizedSplitted.indexOf(cNormalized)
        let correctChar

        if (idx1 !== -1) {
          correctChar = solutionSplitted[idx1]

          solutionSplitted[idx1] = null
          solutionNormalizedSplitted[idx1] = null
          wordSplitted[idx] = null
          wordNormalizedSplitted[idx] = null
        } else if (idx2 !== -1) {
          correctChar = solutionSplitted[idx2]

          solutionSplitted[idx2] = null
          solutionNormalizedSplitted[idx2] = null
          wordSplitted[idx] = null
          wordNormalizedSplitted[idx] = null
        }

        output[idx] = { correct: CharState.OutOfPlace, char: correctChar }
      }
    }
  })

  return output
}

export function layout(
  alphabetRows: string[],
  validations: Array<{ correct: CharState; char: string }> = []
): Array<Record<string, CharState>> {
  const layoutRows = []

  alphabetRows.forEach((alphabets) => {
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

        if (isUpperOrLowerCharacter(c) && layout[c] === CharState.Wrong) {
          layout[c] = CharState.NotUsed
        }
      })
    })

    layoutRows.push(layout)
  })

  return layoutRows
}

export function getShareResults(attempts: Array<Array<Partial<{ correct: CharState }>>>) {
  return attempts.map((attempt) => {
    return attempt
      .map(({ correct }) => {
        return emojiColors[correct]
      })
      .join("")
  })
}
