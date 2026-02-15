import { test, expect } from "@playwright/test"
import wordsData from "../static/words.json" assert { type: "json" }

// Calculate today's word based on date index (same logic as the app)
const epochMs = 1642525200000
const now = Date.now()
const msInDay = 86400000
const dateIndex = Math.floor((now - epochMs) / msInDay)
const todayWord = wordsData.words[dateIndex % wordsData.words.length]

// Helper function to close dialogs
async function closeDialogs(page: any) {
  // First, try to close AnnouncementModal by clicking the "ปิด" button
  try {
    const closeButton = page.locator('button:has-text("ปิด")')
    if (await closeButton.isVisible({ timeout: 1000 })) {
      await closeButton.click()
      await page.waitForTimeout(300)
    }
  } catch {
    // Button not found, that's ok
  }

  // Then close the instructions modal by clicking on it
  try {
    const dialog = page.locator('[role="dialog"]')
    if (await dialog.isVisible({ timeout: 1000 })) {
      await dialog.click()
      await page.waitForTimeout(300)
    }
  } catch {
    // No more dialogs
  }
}

test.describe("Smoke Tests - All Routes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await closeDialogs(page)
  })

  test("Daily mode loads", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator('h1:has-text("Thwordle")')).toBeVisible()
    await expect(page.locator("main .layout input")).toBeVisible()
    await expect(page.locator("text=วันที่")).toBeVisible()
    await expect(page.locator("text=ครั้งที่")).toBeVisible()
  })

  test("Unlimited mode loads", async ({ page }) => {
    await page.goto("/unlimited")

    await expect(page.locator('h1:has-text("Thwordle")')).toBeVisible()
    await expect(page.locator("main .layout input")).toBeVisible()
    await expect(page.locator("text=รหัส:")).toBeVisible()
    await expect(page.locator("text=ครั้งที่")).toBeVisible()
    await expect(page.locator("text=Unlimited")).toBeVisible()
  })

  test("Special mode loads", async ({ page }) => {
    await page.goto("/s/s7_761d3701")

    await expect(page.locator('h1:has-text("Thwordle")')).toBeVisible()
    await expect(page.locator("main .layout input")).toBeVisible()
    await expect(page.locator("text=ครั้งที่")).toBeVisible()
  })

  test("Navigation between modes works", async ({ page }) => {
    await page.goto("/")
    await closeDialogs(page)

    await expect(page.locator("text=Unlimited")).toBeVisible()

    await page.click("text=Unlimited")
    await expect(page).toHaveURL("/unlimited")
    await closeDialogs(page)
    await expect(page.locator("text=รหัส:")).toBeVisible()

    await page.click("text=Daily")
    await expect(page).toHaveURL("/")
    await closeDialogs(page)

    await page.goto("/s/s7_761d3701")
    await closeDialogs(page)
    await expect(page.locator("main .layout input")).toBeVisible()
  })

  test("Daily mode has Thai keyboard", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("main .layout")).toBeVisible()
    const keyboardButtons = page.locator(".layout-key")
    await expect(keyboardButtons.first()).toBeVisible()
    await expect(keyboardButtons).toHaveCount(44)
  })

  test("Unlimited mode has restart button initially hidden", async ({ page }) => {
    await page.goto("/unlimited")

    await expect(page.locator('button:has-text("เล่นใหม่")')).not.toBeVisible()
  })

  test("Special mode has share button initially hidden", async ({ page }) => {
    await page.goto("/s/s7_761d3701")

    await expect(page.locator('button:has-text("Share")')).not.toBeVisible()
  })

  test("Thai keyboard is interactive", async ({ page }) => {
    await page.goto("/")
    await closeDialogs(page)

    const keyboardButton = page.locator(".layout-key").first()
    await expect(keyboardButton).toBeVisible()
    await keyboardButton.click()

    await page.waitForTimeout(100)
  })

  test("Daily mode - enter a word and verify game works", async ({ page }) => {
    await page.goto("/")
    await closeDialogs(page)

    // Wait for words to load (the input field should be enabled)
    const input = page.locator("main .layout input")
    await expect(input).toBeVisible()

    // Wait a bit for words.json to load
    await page.waitForTimeout(1000)

    // Use today's actual word - handles variable length (4-10 chars)
    console.log(`Today's word: ${todayWord} (${todayWord.length} chars)`)

    // Type today's word
    await input.fill(todayWord)

    // Verify input contains the word
    await expect(input).toHaveValue(todayWord)

    // Press Enter to submit
    await page.keyboard.press("Enter")

    // Wait for the word to appear on the board
    await page.waitForTimeout(500)

    // Verify the attempt appears on the board (check for colored tiles)
    const attemptTiles = page.locator(".attempt-key")
    await expect(attemptTiles.first()).toBeVisible({ timeout: 5000 })

    // Verify attempt counter increased to show the game accepted the word
    await expect(page.locator("text=ครั้งที่ 1/")).toBeVisible()

    // Verify no error message appeared (word was valid)
    await expect(page.locator("text=คำนี้ไม่มีในพจนานุกรม")).not.toBeVisible()
  })
})
