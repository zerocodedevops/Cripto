import { test, expect } from '@playwright/test';

test.describe('Shop E2E Flow', () => {
  // Reset storage state for every test to ensure clean cart
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    // Note: The app uses internal ShopService which falls back to 'mockProducts.ts'
    // when Firebase is not configured or in this environment.
    // We do NOT need to mock network requests because they are not made via fetchBaseQuery base url.

    // Go to the ecommerce route
    await page.goto('/#/proyectos/ecommerce');
    
    // Wait for the main layout or catalog grid
    await page.waitForLoadState('networkidle'); 
    
    // Wait for grid
    await page.waitForSelector('.grid', { state: 'visible', timeout: 30000 });
  });

  test('should display catalog and add items to cart', async ({ page }) => {
    // Check Catalog Title
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible(); 
    
    // Verify product is visible (From mockProducts.ts)
    await expect(page.getByText('Mochila Fjallraven')).toBeVisible();

    // Add to cart (using aria-label)
    const addButtons = page.getByRole('button', { name: "Añadir al carrito" });
    await expect(addButtons.first()).toBeVisible();
    await addButtons.first().click();

    // Open Cart (Cart icon button usually in navbar)
    // We can assume the update Cart Count badge appears
    await expect(page.locator('.text-white.text-xs')).toHaveText('1');
  });
});
