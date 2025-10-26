import { test, expect } from '@playwright/test'
import special from '../src/lib/special-words'
import fs from 'node:fs'
import path from 'node:path'

function split(word: string) {
  const alphas = word.split('')
  const out: string[] = []
  alphas.forEach((a) => {
    if (/[ก-ฮa-zA-Z]/.test(a) || /[ใเแโไาำะๆฯฤา]/.test(a)) {
      out.push(a)
    } else {
      out[out.length - 1] += a
    }
  })
  return out
}

function wrong(len: number, exclude: string, max: number) {
  const res: string[] = []
  const wordsPath = path.join(process.cwd(), 'public', 'words.json')
  const json = JSON.parse(fs.readFileSync(wordsPath, 'utf-8')) as { words: string[] }
  for (const w of json.words) {
    if (w === exclude) continue
    if (split(w).length === len) {
      res.push(w)
      if (res.length >= max) break
    }
  }
  return res
}

test('lose special', async ({ page }) => {
  const id = 's7_761d3701'
  const word = special[id].word
  const len = split(word).length

  await page.goto(`/#/s/${id}`)
  await page.click('[role="dialog"]')
  const input = page.locator('main .layout input')

  const guesses = wrong(len, word, 6)
  for (const g of guesses) {
    await input.fill(g)
    await page.keyboard.press('Enter')
  }

  await expect(page.locator('[role="dialog"]', { hasText: 'คุณแพ้แล้ว' })).toBeVisible()
})
