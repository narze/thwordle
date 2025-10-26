import { test, expect } from '@playwright/test'
import special from '../src/lib/special-words'

test('win special', async ({ page }) => {
  const id = 's7_761d3701'
  const word = special[id].word

  await page.goto(`/#/s/${id}`)
  await page.click('[role="dialog"]')
  await page.waitForSelector('main .layout input')

  const input = page.locator('main .layout input')
  await input.fill(word)
  await page.keyboard.press('Enter')

  await page.waitForSelector('[role="dialog"]:has-text("คุณชนะแล้ว!")')
  await expect(page.locator('button:has-text("Share")')).toBeVisible()
})
