import { BrowserContext, test } from '@playwright/test';

let context: BrowserContext;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  await context.clearCookies();
});

test.afterAll(async () => {
  await context.close();
});

test('Successful login', async ({ page }) => {
  await page.goto('/login');

  // Fill in the login form
  await page.fill('[name="username"]', 'test@test.com');
  await page.fill('[name="password"]', '1234');

  // Click the login button
  await page.click('text=Login');

  page.on('dialog', async (alert) => {
    await alert.accept();
  });
});

test('Failed login on username', async ({ page }) => {
  await page.goto('/login');

  // Fill in the login form
  await page.fill('[name="username"]', 'test2@test.com');
  await page.fill('[name="password"]', '1234');

  // Click the login button
  await page.click('text=Login');

  page.on('dialog', async (alert) => {
    await alert.accept();
  });
});

test('Failed login on password', async ({ page }) => {
  await page.goto('/login');

  // Fill in the login form
  await page.fill('[name="username"]', 'test@test.com');
  await page.fill('[name="password"]', '123454');

  // Click the login button
  await page.click('text=Login');

  // Assert that the alert contains the correct message
  page.on('dialog', async (alert) => {
    await alert.accept();
  });
});
