import { expect, test } from '@playwright/test';

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/login'); // Adjust if your frontend is running on a different port
    });

    test('should render login page correctly', async ({ page }) => {
        // Check if login form elements are visible
        await expect(page.locator('h2:text("Log In Here")')).toBeVisible();
        await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
        await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
        await expect(page.locator('button:has-text("Login")')).toBeVisible();
    });

 

    test('should successfully log in with valid Patient credentials', async ({ page }) => {
        // Fill in the email and password
        await page.fill('input[placeholder="Email"]', 'rohankc870@gmail.com');
        await page.fill('input[placeholder="Password"]', 'Rohankc');

        // Click the login button
        await page.click('button:has-text("Login")');

        // Wait for redirection to Patient home page
        await expect(page).toHaveURL('http://localhost:5173/home');
    });

    test('should show an error message for invalid credentials', async ({ page }) => {
        // Enter incorrect credentials
        await page.fill('input[placeholder="Email"]', 'wrong@example.com');
        await page.fill('input[placeholder="Password"]', 'wrongpassword');

        // Click the login button
        await page.click('button:has-text("Login")');

        // Expect an error toast message to be visible
        await expect(page.locator('text="Login failed! Please check your credentials."')).toBeVisible();
    });

    test('should toggle password visibility when clicking the eye button', async ({ page }) => {
        // Enter a password
        await page.fill('input[placeholder="Password"]', 'password123');

        // Click the eye button (better selector targeting)
        const eyeButton = page.locator('button[aria-label="toggle password visibility"]');
        await eyeButton.click();

        // Small wait to ensure UI updates
        await page.waitForTimeout(200);

        // Check if password input type is "text"
        const inputType = await page.getAttribute('input[placeholder="Password"]', 'type');
        expect(inputType).toBe('text');

        // Click the eye button again to hide password
        await eyeButton.click();

        // Small wait to ensure UI updates
        await page.waitForTimeout(200);

        // Check if password input type is back to "password"
        const hiddenType = await page.getAttribute('input[placeholder="Password"]', 'type');
        expect(hiddenType).toBe('password');
    });

    test('should navigate to sign-up page when clicking Register', async ({ page }) => {
        await page.click('a:has-text("Register")');
        await expect(page).toHaveURL('http://localhost:5173/signup');
    });

  
});
