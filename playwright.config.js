// tests/e2e/homepage.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test('should display welcome message', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check that the welcome message is visible
    const welcomeText = await page.textContent('[data-testid="welcome"]');
    expect(welcomeText).toBe('Welcome to our Web App');
  });

  test('should allow user to submit form', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Fill out the form
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.click('[data-testid="submit-button"]');
    
    // Check success message appears
    const successMessage = await page.textContent('[data-testid="success-message"]');
    expect(successMessage).toContain('Form submitted successfully');
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Fill form with invalid email
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    await page.click('[data-testid="submit-button"]');
    
    // Check error message appears
    const errorMessage = await page.textContent('[data-testid="error-message"]');
    expect(errorMessage).toContain('Please enter a valid email');
  });
});