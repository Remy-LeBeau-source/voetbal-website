import { expect, type Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();

async function logIn(page: Page, gebruikersnaam: string, wachtwoord: string) {
  await page.locator('#inlogKnop').click();
  const popup = page.getByRole('dialog', { name: 'Inloggen' });
  await popup.getByLabel('Gebruikersnaam').fill(gebruikersnaam);
  await popup.getByLabel('Wachtwoord', { exact: true }).fill(wachtwoord);
  await popup.getByRole('button', { name: 'Inloggen' }).click();
}

Given('ik ben op de voetbalwebsite', async ({ page }) => {
  await page.goto('/');
});

Given('ik ben ingelogd met gebruikersnaam {string} en wachtwoord {string}', async ({ page }, gebruikersnaam: string, wachtwoord: string) => {
  await logIn(page, gebruikersnaam, wachtwoord);
  await expect(page.locator('#accountNaam')).toContainText(gebruikersnaam);
});

When('ik inlog met gebruikersnaam {string} en wachtwoord {string}', async ({ page }, gebruikersnaam: string, wachtwoord: string) => {
  await logIn(page, gebruikersnaam, wachtwoord);
});

// Typt zichtbaar, letter voor letter, en laat het klikken op Inloggen aan de mens over
When('ik gebruikersnaam {string} en wachtwoord {string} invul', async ({ page }, gebruikersnaam: string, wachtwoord: string) => {
  await page.locator('#inlogKnop').click();
  const popup = page.getByRole('dialog', { name: 'Inloggen' });
  await popup.getByLabel('Gebruikersnaam').pressSequentially(gebruikersnaam, { delay: 90 });
  await popup.getByLabel('Wachtwoord', { exact: true }).pressSequentially(wachtwoord, { delay: 90 });
});

When('ik op het oogje druk', async ({ page }) => {
  await page.locator('#inlogOog').click();
});

Then('zie ik het wachtwoord {string}', async ({ page }, wachtwoord: string) => {
  await expect(page.locator('#inlogWachtwoord')).toHaveAttribute('type', 'text');
  await expect(page.locator('#inlogWachtwoord')).toHaveValue(wachtwoord);
});

Then('is het wachtwoord verborgen', async ({ page }) => {
  await expect(page.locator('#inlogWachtwoord')).toHaveAttribute('type', 'password');
});

When('ik zelf op de knop Inloggen druk', async ({ page, $test }) => {
  $test.setTimeout(5 * 60_000);      // de test wacht maximaal 5 minuten op jouw klik
  await expect(page.getByRole('dialog', { name: 'Inloggen' })).toBeHidden({ timeout: 5 * 60_000 });
});

When('ik uitlog',async ({ page }) => {
  await page.locator('#uitlogKnop').click();
});

When('ik de pagina ververs', async ({ page }) => {
  await page.reload();
});

Then('ben ik ingelogd als {string}', async ({ page }, gebruikersnaam: string) => {
  await expect(page.locator('#accountNaam')).toContainText(gebruikersnaam);
  await expect(page.getByRole('dialog', { name: 'Inloggen' })).toBeHidden();
});

Then('ben ik uitgelogd', async ({ page }) => {
  await expect(page.locator('#accountNaam')).toBeHidden();
  await expect(page.locator('#uitlogKnop')).toBeHidden();
});

Then('zie ik de knop {string}', async ({ page }, naam: string) => {
  await expect(page.getByRole('navigation').getByRole('button', { name: naam, exact: true })).toBeVisible();
});

Then('zie ik de foutmelding {string}', async ({ page }, melding: string) => {
  await expect(page.getByRole('alert')).toHaveText(melding);
});
