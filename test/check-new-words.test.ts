import fs from "fs"
import path from "path"

describe("NEW_WORDS.md validation", () => {
  it("should check if any words from NEW_WORDS.md exist in words.json", () => {
    const newWordsPath = path.join(__dirname, "../NEW_WORDS.md")
    const newWordsContent = fs.readFileSync(newWordsPath, "utf-8")

    const wordsJsonPath = path.join(__dirname, "../public/words.json")
    const wordsJsonContent = fs.readFileSync(wordsJsonPath, "utf-8")
    const wordsData = JSON.parse(wordsJsonContent)
    const existingWords = new Set(wordsData.words)

    // Filter lines that start with "- "
    const lines = newWordsContent.split("\n")
    const newWords = lines
      .filter((line) => line.startsWith("- "))
      .map((line) => line.substring(2).trim())
      .filter((word) => word && word !== "-")

    const duplicateWords = newWords.filter((word) => existingWords.has(word))

    if (duplicateWords.length > 0) {
      console.log(`Found ${duplicateWords.length} duplicate words:`, duplicateWords)
    }

    expect(duplicateWords).toHaveLength(0)
  })

  it("should check if any words from NEW_WORDS.md are duplicates within the same file", () => {
    const newWordsPath = path.join(__dirname, "../NEW_WORDS.md")
    const newWordsContent = fs.readFileSync(newWordsPath, "utf-8")

    const lines = newWordsContent.split("\n")
    const newWords = lines
      .filter((line) => line.startsWith("- "))
      .map((line) => line.substring(2).trim())
      .filter((word) => word && word !== "-")

    const duplicateWords = newWords.filter((word, index, self) => self.indexOf(word) !== index)

    expect(duplicateWords).toHaveLength(0)
  })
})
