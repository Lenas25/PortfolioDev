import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load homepage", async ({ page }) => {
    await expect(page).toHaveTitle(/Lena/i);
  });

  test("should navigate to about section on nav click", async ({ page }) => {
    await page.click('a[href="#about"]');
    await expect(page.locator("#about")).toBeVisible();
  });

  test("should navigate to projects section", async ({ page }) => {
    await page.click('a[href="#projects"]');
    await expect(page.locator("#projects")).toBeVisible();
  });

  test("scroll to top button in footer works", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.click('footer a[href="#hero"]');
    await expect(page.locator("#hero")).toBeVisible();
  });
});
