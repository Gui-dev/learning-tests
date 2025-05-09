import { test, expect } from '@playwright/test'

test('should be able login with correct credentials', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.getByPlaceholder('Email').fill('test@example.com')
  await page.getByPlaceholder('Senha').fill('123456')
  await page.getByRole('button', { name: /entrar/i }).click()

  // debug temporário
  await page.waitForTimeout(1000)

  await expect(page.getByText(/bem-vindo/i)).toBeVisible({ timeout: 10000 })

  await page.getByRole('button', { name: /sair/i }).click()

  await expect(page.getByPlaceholder('Email')).toBeVisible()
})
