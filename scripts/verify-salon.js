
import { chromium } from '@playwright/test';
import path from 'path';

async function verifySalon() {
    console.log('Starting visual verification on PREVIEW...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') console.log(`CONSOLE ERROR: "${msg.text()}"`);
    });

    page.on('pageerror', err => {
        console.log(`PAGE ERROR: "${err.message}"`);
    });

    try {
        // Navigate to local PREVIEW server
        console.log('Navigating to http://localhost:4173/#/proyectos/salon');
        await page.goto('http://localhost:4173/#/proyectos/salon', { waitUntil: 'networkidle' });

        // Set viewport to desktop size
        await page.setViewportSize({ width: 1920, height: 1080 });

        // Wait a bit for animations
        await page.waitForTimeout(3000);

        // Take screenshot
        const screenshotPath = path.resolve('salon-verification-preview.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Screenshot saved to: ${screenshotPath}`);

        // Check for specific text to verify content update
        const textLocator = page.getByText('Zero Vanity');
        const isVisible = await textLocator.first().isVisible();

        if (isVisible) {
            console.log('SUCCESS: "Zero Vanity" branding detected.');
        } else {
            console.log('WARNING: "Zero Vanity" branding NOT detected.');
        }

    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await browser.close();
    }
}

verifySalon();
