import { expect, test } from '@playwright/test';

test.describe('Products Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Step 1: Log in first
        await page.goto('http://localhost:5173/login');

        // Fill in valid user credentials (Ensure this user exists in your database)
        await page.fill('input[placeholder="Email"]', 'rohankc870@gmail.com'); 
        await page.fill('input[placeholder="Password"]', 'Rohankc');

        // Click the login button
        await page.click('button:has-text("Login")');

        // Wait for redirection to home page 
        await page.waitForURL('http://localhost:5173/home');

        // Step 2: Navigate to the products page
        await page.goto('http://localhost:5173/product'); // Fixed path
    });

    test('should display products on the page', async ({ page }) => {
        // Wait for products to load
        await page.waitForSelector('.bg-white.rounded-lg.shadow-md.p-4');

        // Check that at least one product is displayed
        const productCount = await page.locator('.bg-white.rounded-lg.shadow-md.p-4').count();
        expect(productCount).toBeGreaterThan(0);
    });

    test('should allow searching for a product', async ({ page }) => {
        // Type in the search bar
        await page.fill('input[placeholder="Search medicines..."]', 'Ibuprofen');

        // Wait for filtered results
        await page.waitForTimeout(1000);

        // Check that at least one filtered product is displayed
        const filteredProductCount = await page.locator('.bg-white.rounded-lg.shadow-md.p-4').count();
        expect(filteredProductCount).toBeGreaterThan(0);
    });

    



    
});
