import { expect, test } from '@playwright/test';

test.describe('Doctors Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        // ✅ Navigate directly to the doctors page
        await page.goto('http://localhost:5173/doctor');
    });

    test('should display doctors on the page', async ({ page }) => {
        // ✅ Wait for doctors to load
        await page.waitForSelector('.bg-white.shadow-md.rounded-lg.p-6');

        // ✅ Check that at least one doctor is displayed
        const doctorCount = await page.locator('.bg-white.shadow-md.rounded-lg.p-6').count();
        expect(doctorCount).toBeGreaterThan(0);
    });

    test('should filter doctors by specialization', async ({ page }) => {
        // ✅ Ensure specialization filters are available
        await page.waitForSelector('input[type="radio"]');

        // ✅ Store the initial number of doctors
        const initialDoctorCount = await page.locator('.bg-white.shadow-md.rounded-lg.p-6').count();

        // ✅ Click the first specialization filter
        await page.locator('input[type="radio"]').first().click();

        // ✅ Wait for filtered results to load
        await page.waitForTimeout(1000);

        // ✅ Get the updated doctor count after applying the filter
        const filteredDoctorCount = await page.locator('.bg-white.shadow-md.rounded-lg.p-6').count();

        // ✅ Ensure that the number of displayed doctors has changed
        expect(filteredDoctorCount).toBeLessThan(initialDoctorCount);
    });

    test('should clear the specialization filter', async ({ page }) => {
        // ✅ Ensure specialization filters are available
        await page.waitForSelector('input[type="radio"]');

        // ✅ Click the first specialization filter
        await page.locator('input[type="radio"]').first().click();

        // ✅ Wait for filtered results
        await page.waitForTimeout(1000);

        // ✅ Click the "Clear All" button to reset filters
        await page.locator('button:has-text("Clear All")').click();

        // ✅ Wait for doctors to reset to the full list
        await page.waitForTimeout(1000);

        // ✅ Ensure all doctors are displayed again
        const doctorCountAfterClear = await page.locator('.bg-white.shadow-md.rounded-lg.p-6').count();
        expect(doctorCountAfterClear).toBeGreaterThan(0);
    });

});
