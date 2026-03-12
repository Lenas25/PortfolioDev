import { test, expect } from "@playwright/test";

test.describe("Language Switch", () => {
  test("switches from ES to EN", async ({ page }) => {
    await page.goto("/");

    // Default is ES — look for Spanish text
    await expect(page.locator("body")).toContainText(
      /Proyectos|Sobre mí|Habilidades/i,
    );

    // Switch to EN
    await page.click('[title="Toggle language"]');
    await expect(page.locator("body")).toContainText(/Projects|About|Skills/i);
  });
});
