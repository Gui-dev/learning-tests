import { expect, test } from '@playwright/test'

test('should redirect to login if not authenticated', async ({ page }) => {
  await page.goto('http://localhost:5173/dashboard')

  await expect(page.getByPlaceholder('Email')).toBeVisible()
})

test('should access dashboard if authenticated', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.getByPlaceholder(/email/i).fill('test@example.com')
  await page.getByPlaceholder(/senha/i).fill('123456')
  await page.getByRole('button', { name: /entrar/i }).click()

  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
})
