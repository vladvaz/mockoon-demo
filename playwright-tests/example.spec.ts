import { test, expect } from '@playwright/test';

const pageUrl = 'http://localhost:4173';

test('has 5 slides to show', async ({ page }) => {
  await page.goto(pageUrl);
  const paginationControls = await page.getByTestId('pagination-controls').getByRole("listitem").count();
  expect(paginationControls).toEqual(7);

});

test('has title', async ({ page }) => {
  await page.goto(pageUrl);
  await expect(page.getByRole('heading', { name: 'A demo of Mockoon' })).toBeVisible();
});
