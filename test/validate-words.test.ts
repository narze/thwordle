import { test, describe, expect } from "vitest"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe("words.json validation", () => {
  test("should not contain English characters, words, or spaces", () => {
    const wordsJsonPath = path.join(__dirname, "../public/words.json")
    const wordsJsonContent = fs.readFileSync(wordsJsonPath, "utf-8")
    const wordsData = JSON.parse(wordsJsonContent)
    const words: string[] = wordsData.words

    // Define regexes for invalid patterns
    const englishCharRegex = /[a-zA-Z]/
    const spaceRegex = /\s/

    const disallowedPatterns: [RegExp, string][] = [
      [englishCharRegex, "English characters"],
      [spaceRegex, "spaces"],
      [/\d/, "numbers"],
      [/ๆ/, "ไม้ยมก"],
      [/ฯ/, "ไปยาล"],
    ]

    // Find words that contain invalid patterns
    const invalidWords = words.filter((word: string) => {
      return disallowedPatterns.some(([regex]) => regex.test(word))
    })

    if (invalidWords.length > 0) {
      console.log(`Found ${invalidWords.length} invalid words:`)
      invalidWords.forEach((word: string) => {
        const issues: string[] = []
        disallowedPatterns.forEach(([regex, description]) => {
          if (regex.test(word)) {
            if (description === "English characters") {
              const matches = word.match(/[a-zA-Z]+/g)
              issues.push(`${description}: ${matches?.join(", ")}`)
            } else {
              issues.push(description)
            }
          }
        })
        console.log(`  - "${word}" contains: ${issues.join(", ")}`)
      })
    }

    expect(invalidWords).toHaveLength(0)
  })

  test("should not contain duplicate words", () => {
    const wordsJsonPath = path.join(__dirname, "../public/words.json")
    const wordsJsonContent = fs.readFileSync(wordsJsonPath, "utf-8")
    const wordsData = JSON.parse(wordsJsonContent)
    const words: string[] = wordsData.words

    // Find duplicates
    const seen = new Set<string>()
    const duplicates: string[] = []

    words.forEach((word: string, index: number) => {
      if (seen.has(word)) {
        if (!duplicates.includes(word)) {
          duplicates.push(word)
        }
      } else {
        seen.add(word)
      }
    })

    if (duplicates.length > 0) {
      console.log(`Found ${duplicates.length} duplicate words:`)
      duplicates.forEach((word: string) => {
        const indices = words.map((w, i) => (w === word ? i : -1)).filter((i) => i !== -1)
        console.log(`  - "${word}" appears at indices: ${indices.join(", ")}`)
      })
    }

    expect(duplicates).toHaveLength(0)
  })
})
