import { test, expect } from "@playwright/test";

/**
 * Theme selector smoke tests (desktop + mobile via config projects run
 * all files; these assertions are viewport-agnostic).
 */
test("theme selector switches Dark / Light / System and persists", async ({ page }) => {
  await page.goto("/");
  const group = page.getByRole("group", { name: "Color theme" });
  await expect(group).toBeVisible();

  // header brand logo renders at responsive height
  const logo = page.locator('img[src*="bestcor-logo.svg"]').first();
  await expect(logo).toBeVisible();
  const logoBox = await logo.boundingBox();
  expect(logoBox).not.toBeNull();
  if (logoBox) expect(logoBox.height).toBeGreaterThan(50); // enlarged logo

  const bg = () =>
    page.evaluate(() => getComputedStyle(document.body).backgroundColor);

  // Light
  await group.getByRole("button", { name: "Light theme" }).click();
  await expect(page.locator("html")).toHaveClass(/light/);
  const lightBg = await bg();
  expect(lightBg).not.toBe("rgb(6, 10, 8)");
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");

  // Dark
  await group.getByRole("button", { name: "Dark theme" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  expect(await bg()).toBe("rgb(6, 10, 8)");
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

  // System
  await group.getByRole("button", { name: "System theme" }).click();
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("system");

  // Persisted preference survives reload
  await group.getByRole("button", { name: "Dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);

  // No obvious console errors on theme switching
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await group.getByRole("button", { name: "Light theme" }).click();
  await page.waitForTimeout(300);
  expect(errors).toHaveLength(0);
});
