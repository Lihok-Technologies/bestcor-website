import { test, expect } from "@playwright/test";

/**
 * Bestcor smoke tests — keep lightweight. They run on desktop + mobile
 * viewports against a production `next start` server (see playwright.config).
 */

test("1. Homepage renders with brand headline and logo", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /built on integrity/i }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: /driven by quality/i })).toBeVisible();
  // header brand link: decorative logo + visible wordmark provide the name
  await expect(
    page.getByRole("banner").getByRole("link", { name: /bestcor phils/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /request a quotation/i }).first()).toBeVisible();
});

test("2. Main navigation reaches the About page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1, name: /integrity & quality/i })).toBeVisible();
});

test("3. Services page lists all six service lines", async ({ page }) => {
  await page.goto("/services");
  await expect(page.getByRole("heading", { level: 1, name: /reliability/i })).toBeVisible();
  for (const name of [
    "Preventive Maintenance",
    "On-Site Repairs",
    "Supply, Installation & Construction",
    "Electrical Testing & Diagnostics",
    "Distribution Components & Works",
    "Transmission & Pole-Line Works",
  ]) {
    await expect(page.getByRole("heading", { name })).toBeVisible();
  }
});

test("4. Service detail route renders scope", async ({ page }) => {
  await page.goto("/services/testing-diagnostics");
  await expect(page.getByRole("heading", { level: 1, name: /testing & diagnostics/i })).toBeVisible();
  await expect(page.getByText("Transformers", { exact: false }).first()).toBeVisible();
});

test("5. Our Work and Gallery pages load photography", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("heading", { level: 1, name: /real work/i })).toBeVisible();
  await page.goto("/gallery");
  await expect(page.getByRole("heading", { level: 1, name: /field photographs/i })).toBeVisible();
});

test("6. Safety & Quality page renders approach content", async ({ page }) => {
  await page.goto("/safety-quality");
  await expect(page.getByRole("heading", { level: 1, name: /safely/i })).toBeVisible();
});

test("7. Primary hero CTA reaches the quotation flow", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /^Request a Quotation/i }).first().click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { level: 1, name: /request a quotation/i })).toBeVisible();
});

test("8. Quotation form validates and never fakes delivery", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /submit request/i }).click();
  // required-field validation surfaces instead of a fake success
  await expect(page.getByText("Please select a service.")).toBeVisible();

  await page.getByLabel(/full name/i).fill("Maria Santos");
  await page.getByLabel(/email/i).fill("maria@example.com");
  await page.getByLabel(/service required/i).selectOption({ label: "Electrical Testing & Diagnostics" });
  await page
    .getByLabel(/project description/i)
    .fill("We need electrical testing of our transformer and switchgear at our plant. Please advise on scope and schedule.");
  await page.getByRole("checkbox", { name: /consent/i }).check();
  await page.getByRole("button", { name: /submit request/i }).click();

  if (process.env.RESEND_API_KEY) {
    // Delivery configured: allow a genuine success message only.
    await expect(page.getByText("Sent to Bestcor", { exact: true })).toBeVisible();
  } else {
    // No provider configured: the UI must say so honestly, never fake success.
    await expect(page.getByText(/delivery is not enabled/i)).toBeVisible();
    await expect(page.getByText("Sent to Bestcor", { exact: true })).toHaveCount(0);
  }
});
