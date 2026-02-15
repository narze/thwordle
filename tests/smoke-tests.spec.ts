import { test, expect } from "@playwright/test"

test.describe("Smoke Tests - All Routes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.click('[role="dialog"]')
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

    await expect(page.locator("text=Unlimited")).toBeVisible()

    await page.click("text=Unlimited")
    await expect(page).toHaveURL("/unlimited")
    await expect(page.locator("text=รหัส:")).toBeVisible()

    await page.click("text=Daily")
    await expect(page).toHaveURL("/")

    await page.goto("/s/s7_761d3701")
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

    const keyboardButton = page.locator(".layout-key").first()
    await expect(keyboardButton).toBeVisible()
    await keyboardButton.click()

    await page.waitForTimeout(100)
  })
})
