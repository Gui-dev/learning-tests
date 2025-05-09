import { expect, test } from '@playwright/test'

test('should redirect to login if not authenticated', async ({ page }) => {
  await page.goto('http://localhost:5173/dashboard')

  await expect(page.getByPlaceholder('Email')).toBeVisible()
})
