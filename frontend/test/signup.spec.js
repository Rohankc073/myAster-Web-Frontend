import { expect, test } from '@playwright/test';

test.describe('Sign-Up Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/signup');
    });

    test('should render sign-up page correctly', async ({ page }) => {
        await expect(page.locator('h2:text("Sign Up Here")')).toBeVisible();
        await expect(page.locator('input[placeholder="Full Name"]')).toBeVisible();
        await expect(page.locator('input[placeholder="Email"]')).toBeVisible();
        await expect(page.locator('input[placeholder="Phone No."]')).toBeVisible();
        await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
        await expect(page.locator('form button[type="submit"]')).toBeVisible(); // Fixed selector
    });

    test('should successfully sign up a new user', async ({ page }) => {
        await page.fill('input[placeholder="Full Name"]', 'John Doe');
        await page.fill('input[placeholder="Email"]', 'johndoe1233@gmail.com');
        await page.fill('input[placeholder="Phone No."]', '9876543210');
        await page.fill('input[placeholder="Password"]', 'Test@123');
    
        await page.click('form button[type="submit"]');
    
        // ✅ Try different selectors for the toast message
        await expect(page.locator('text="Sign up successful"')).toBeVisible({ timeout: 10000 });
        // OR
        await expect(page.locator('text=Sign up successful! Redirecting...')).toBeVisible({ timeout: 10000 });
        // OR
        await expect(page.locator('.Toastify__toast:has-text("Sign up successful")')).toBeVisible({ timeout: 10000 });
    
        // ✅ Wait for redirection to login page
        await page.waitForURL('http://localhost:5173/login', { timeout: 10000 });
    });
    test('should show error for invalid input', async ({ page }) => {
        await page.fill('input[placeholder="Full Name"]', 'John Doe');
        await page.fill('input[placeholder="Email"]', 'johndoe1@gmail.com');
        await page.fill('input[placeholder="Phone No."]', '12345'); // Invalid number
        await page.fill('input[placeholder="Password"]', 'Test@123');

        await page.click('form button[type="submit"]');

        await expect(page.locator('text=Phone number must be exactly 10 digits')).toBeVisible(); // Fixed selector
    });

    test('should toggle password visibility when clicking the eye button', async ({ page }) => {
        await page.fill('input[placeholder="Password"]', 'password123');

        const eyeButton = page.locator('button[aria-label="toggle password visibility"]');
        await eyeButton.click();
        await page.waitForTimeout(200);

        const inputType = await page.getAttribute('input[placeholder="Password"]', 'type');
        expect(inputType).toBe('text');

        await eyeButton.click();
        const hiddenType = await page.getAttribute('input[placeholder="Password"]', 'type');
        expect(hiddenType).toBe('password');
    });

    test('should navigate to login page when clicking "Log In"', async ({ page }) => {
        await page.click('a:has-text("Log In")');
        await expect(page).toHaveURL('http://localhost:5173/login');
    });
});
