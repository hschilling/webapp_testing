// tests/e2e/basic.spec.js
const { test, expect } = require('@playwright/test');

test('homepage loads correctly', async ({ page }) => {
  // Navigate to the page and wait for network to be idle
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Check the title
  await expect(page).toHaveTitle('Web App');
  
  // Verify welcome message is visible
  const welcome = page.getByTestId('welcome');
  await expect(welcome).toBeVisible();
  await expect(welcome).toHaveText('Welcome to our Web App');
  
  // Verify form elements are present
  await expect(page.getByTestId('name-input')).toBeVisible();
  await expect(page.getByTestId('email-input')).toBeVisible();
  await expect(page.getByTestId('submit-button')).toBeVisible();
});