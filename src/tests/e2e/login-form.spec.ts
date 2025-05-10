import { test, expect } from '@playwright/test'

test('should be able login with correct credentials', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await page.getByPlaceholder('Email').fill('test@example.com')
  await page.getByPlaceholder('Senha').fill('123456')
  await page.getByRole('button', { name: /entrar/i }).click()

  await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
  await expect(page.getByText(/bem-vindo/i)).toBeVisible()

  await page.getByRole('button', { name: /sair/i }).click()
  await expect(page.getByPlaceholder('Email')).toBeVisible()
})
