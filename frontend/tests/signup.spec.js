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

    // test('should successfully sign up a new user', async ({ page }) => {
    //     await page.fill('input[placeholder="Full Name"]', 'John Doe');
    //     await page.fill('input[placeholder="Email"]', `johndoe${Date.now()}@gmail.com`); // Unique email every time
    //     await page.fill('input[placeholder="Phone No."]', '9876543210');
    //     await page.fill('input[placeholder="Password"]', 'Test@123');
    
    //     await page.click('form button[type="submit"]');
    
    //     // ✅ Wait for up to 30 seconds to allow email sending to complete
    //     await expect(page.locator('text="Sign up successful"')).toBeVisible({ timeout: 30000 });
        
    //     // ✅ Ensure redirection happens correctly
    //     await page.waitForURL('http://localhost:5173/login', { timeout: 30000 });
    // });
    
    test('should show error for invalid input', async ({ page }) => {
        await page.fill('input[placeholder="Full Name"]', 'John Doe');
        await page.fill('input[placeholder="Email"]', 'johndoe19@gmail.com');
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
