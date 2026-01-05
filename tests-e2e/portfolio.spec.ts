import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Strict Tests', () => {
  test.use({ locale: 'es-ES' });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should verify strict accessibility and layout presence', async ({ page }) => {
    // Hero Section
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: /Hola, soy/i })).toBeVisible();
    
    // Check key action buttons in Hero
    const contactBtn = page.getByRole('button', { name: /Contáctame/i });
    await expect(contactBtn).toBeVisible();
    await expect(contactBtn).toBeEnabled();
    
    // STRICT: Ensure no multiple elements match (default Playwright behavior, but verified here)
    const heroSection = page.locator('#hero');
    await expect(heroSection).toHaveCount(1);
  });

  test('should navigate sections correctly', async ({ page }) => {
    // Verify "Sobre mí" navigation
    const aboutLink = page.getByRole('link', { name: 'Sobre mí' }).first();
    await aboutLink.click();
    // Wait for scroll (approximate check via URL or viewport intersection if possible, but visibility of target is good)
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('should have working social links', async ({ page }) => {
    // Check GitHub link in Hero section
    // Use more specific wait or check for presence first if visibility is flaky due to animation
    const githubLink = page.locator('#hero a[href="https://github.com/zerocodedevops"]').first();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toBeVisible({ timeout: 10000 });

    // Check LinkedIn link in Hero section
    const linkedinLink = page.locator('#hero a[href="https://www.linkedin.com/in/zerocode-devops"]').first();
    await expect(linkedinLink).toBeVisible();
  });

  test('should validate contact form inputs strictly', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /Enviar mensaje/i });
    
    // Click submit without filling anything
    await submitBtn.click();
    
    // Check for HTML5 validation or custom error messages (assuming HTML5 required attribute for now)
    // Testing validation state strictly
    // Check validity state after submit
    await expect(page.locator('input#name:invalid')).toBeVisible();
    
    await expect(page.locator('input#email:invalid')).toBeVisible();
  });
  
  test('should not have forbidden text (Lorem Ipsum)', async ({ page }) => {
     const bodyText = await page.textContent('body');
     expect(bodyText).not.toContain('Lorem ipsum');
  });
});
