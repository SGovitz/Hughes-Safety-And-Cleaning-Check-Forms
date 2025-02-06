import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://roompact.com/users/login?redirect=/forms/#/submit');
  await page.getByRole('textbox', { name: 'Please enter the email' }).click();
  await page.getByRole('textbox', { name: 'Please enter the email' }).fill('sgovitz@cub.uca.edu');
  await page.getByRole('textbox', { name: 'Please enter the email' }).press('Enter');
  await page.getByRole('textbox', { name: 'Username:' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill('sgovitz');
  await page.getByRole('textbox', { name: 'Username:' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password:' }).fill('Legobob-12!');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Hub' }).click();
  await page.waitForTimeout(5000); 
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByRole('heading', { name: 'Safety & Cleaning Check Form' }).click();
  await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).click();
  await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).fill('02/05/2025');
  await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).press('Enter');
  await page.getByRole('textbox', { name: 'Tag Buildings' }).click();
  await page.getByRole('textbox', { name: 'Tag Buildings' }).fill('Hughes');
  await page.locator('div').filter({ hasText: /^Hughes Hall$/ }).nth(4).click();
  await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).click();
  await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).fill('237');
  await page.getByText('Hughes Hall - 2 - Room 237 (RA)').click();
  await page.getByRole('group', { name: 'Did you key in? (you must' }).getByLabel('Yes').check();
  await page.getByRole('group', { name: 'Was a resident present during' }).getByLabel('No').check();
  await page.getByRole('radio', { name: 'Not Applicable' }).check();
  await page.getByRole('group', { name: 'The room/suite is clean.' }).getByLabel('Yes').check();
  await page.getByRole('group', { name: 'Any illegal decorations?' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'This room has passed my' }).getByLabel('Yes').check();
  await page.getByRole('textbox', { name: 'Notes:' }).click();
  await page.getByRole('textbox', { name: 'Notes:' }).fill('this is the automatic test (if this sends, that means it works)');
  await page.getByRole('button', { name: 'Submit ' }).click();
  await page.getByRole('button', { name: ' File Form' }).click();

  

});