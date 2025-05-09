import { expect, test } from '@playwright/test'

test('should not be able login with invalid credentials', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.getByPlaceholder('Email').fill('wrong@example.com')
  await page.getByPlaceholder('Senha').fill('wrongpassword')
  await page.getByRole('button', { name: /entrar/i }).click()

  const errorAlert = page.getByRole('alert')
  await expect(errorAlert).toBeVisible()
  await expect(errorAlert).toHaveText('Credentials do not match')
})
