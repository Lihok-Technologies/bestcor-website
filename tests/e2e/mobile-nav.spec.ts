import { test, expect } from "@playwright/test";

/**
 * Mobile navigation smoke (runs only on the mobile project, see config):
 *  - the sheet menu opens/closes
 *  - a link navigates and the sheet closes afterwards
 */

test("6m. Mobile menu opens, navigates and closes", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Open menu" });
  await expect(menuButton).toBeVisible();

  await menuButton.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: /about/i })).toBeVisible();

  await dialog.getByRole("link", { name: /about/i }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("dialog", { name: "Menu" })).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1, name: /integrity & quality/i })).toBeVisible();

  // reopen and close via the sheet's Close button
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toHaveCount(0);
});
