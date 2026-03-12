import { test, expect } from "@playwright/test";

test.describe("Theme Switch", () => {
  test("toggles between dark and light theme", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");

    // Default is dark
    await expect(html).toHaveAttribute("data-theme", "dark");

    // Click theme toggle
    await page.click('[title="Toggle theme"]');
    await expect(html).toHaveAttribute("data-theme", "light");

    // Click again to go back to dark
    await page.click('[title="Toggle theme"]');
    await expect(html).toHaveAttribute("data-theme", "dark");
  });
});
