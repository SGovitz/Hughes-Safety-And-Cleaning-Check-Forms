import { test, expect } from '@playwright/test';

//Website Information
const roompactEmail = '';  //Email to log into roompact
const username = '';  //username to log into MyUCA
const password = ''; //Password to log into MyUCA
const date = ''; //Ex. mm/dd/year

//Update this with all the rooms that passed****************
const pass = [];

//Ex. [1, 0]  <--Make sure to add commas after each number
// 1 -> Keyed into room
// 0 -> Did not key into room
const passKey = [];

//Update this with all the rooms that failed****************
const fail = []; 

//Ex. [1, 0]  <--Make sure to add commas after each number
// 1 -> Keyed into room
// 0 -> Did not key into room
const failKey = [];

//Ex. [1, 2, 0]  <--Make sure to add commas after each number
// 1 -> Clean: This room failed because room was dirty
// 0 -> Illegal: This room failed because it had illegal decorations (alcohol, candles, microwave, etc)
// 2 -> Both; This room failed because it was dirty and had illegal decorations
const failType = [];

//Write the reason why you are failing them (Make sure each note is in the same order where the room number is above^^)
//Ex. "Room failed because of dirty sink, marked in roompact", <----Make sure to add quotations around each note and acomma after each note
//    "Room failed because of alcohol"                         <----Last note does not need a comma
const notes = [


];

//Update this with all the rooms that failed****************
const empty = [];

test.setTimeout(600000);

/** Logs into Roompact and navigates to the Forms page */
async function loginToRoompact(page, roompactEmail, username, password) {
  await page.goto('https://roompact.com/users/login?redirect=/forms/#/submit');
  await page.getByRole('textbox', { name: 'Please enter the email' }).click();
  await page.getByRole('textbox', { name: 'Please enter the email' }).fill(roompactEmail);
  await page.getByRole('textbox', { name: 'Please enter the email' }).press('Enter');
  await page.getByRole('textbox', { name: 'Username:' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill(username);
  await page.getByRole('textbox', { name: 'Username:' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password:' }).fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('link', { name: 'Hub' }).click();
  // Instead of fixed waits, you could wait for specific selectors if available.
  await page.waitForTimeout(7000);
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.waitForTimeout(2000);
}

/** Fills in the common fields on the Safety & Cleaning Check Form */
async function fillCommonDetails(page, roomStr, date) {
  await page.getByRole('heading', { name: 'Safety & Cleaning Check Form' }).click();
  await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).click();
  await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).fill(date);
  await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).press('Enter');
  await page.getByRole('textbox', { name: 'Tag Buildings' }).click();
  await page.getByRole('textbox', { name: 'Tag Buildings' }).fill('Hughes');
  await page.waitForTimeout(1000);
  await page.locator('div').filter({ hasText: /^Hughes Hall$/ }).nth(4).click();
  await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).click();
  await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).fill(roomStr);
  await page.waitForTimeout(1000);
  // Adjust the text selector as needed (remove "(RA)" in production if necessary)
  await page.getByText(`Hughes Hall - 2 - Room ${roomStr} (RA)`).click();
}

/** Sets the keyed-in answers based on the keyed value (1 = keyed, 0 = not keyed) */
async function fillKeyedIn(page, keyed) {
  if (keyed === 1) {
    await page.getByRole('group', { name: 'Did you key in? (you must' }).getByLabel('Yes').check();
    await page.getByRole('group', { name: 'Was a resident present during' }).getByLabel('No').check();
  } else {
    await page.getByRole('group', { name: 'Did you key in? (you must' }).getByLabel('No').check();
    await page.getByRole('group', { name: 'Was a resident present during' }).getByLabel('Yes').check();
  }
}

/** Submits the form for a passed room */
async function submitPassedRoom(page, room, date, keyed) {
  const roomStr = room.toString();
  await fillCommonDetails(page, roomStr, date);
  await fillKeyedIn(page, keyed);

  await page.getByRole('radio', { name: 'Not Applicable' }).check();
  await page.getByRole('group', { name: 'The room/suite is clean.' }).getByLabel('Yes').check();
  await page.getByRole('group', { name: 'Any illegal decorations?' }).getByLabel('No').check();
  await page.getByRole('group', { name: 'This room has passed my' }).getByLabel('Yes').check();
  await page.getByRole('textbox', { name: 'Notes:' }).click();
  // For passed rooms, the note is currently set to 'Void'; change as needed.
  await page.getByRole('textbox', { name: 'Notes:' }).fill('Void');
  await page.getByRole('button', { name: 'Submit ' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: ' File Form' }).click();
}

/** Submits the form for a failed room */
async function submitFailedRoom(page, room, date, keyed, type, note) {
  const roomStr = room.toString();
  await fillCommonDetails(page, roomStr, date);
  await fillKeyedIn(page, keyed);

  await page.getByRole('radio', { name: 'Not Applicable' }).check();

  // If the failure was due to cleanliness (or both), mark "The room/suite is clean." as No.
  if (type === 1 || type === 2) {
    await page.getByRole('group', { name: 'The room/suite is clean.' }).getByLabel('No').check();
  } else {
    await page.getByRole('group', { name: 'The room/suite is clean.' }).getByLabel('Yes').check();
  }
  
  // If the failure was due to illegal decorations (or both), mark "Any illegal decorations?" as Yes.
  if (type === 0 || type === 2) {
    await page.getByRole('group', { name: 'Any illegal decorations?' }).getByLabel('Yes').check();
  } else {
    await page.getByRole('group', { name: 'Any illegal decorations?' }).getByLabel('No').check();
  }

  await page.getByRole('group', { name: 'This room has passed my' }).getByLabel('No').check();
  await page.getByRole('textbox', { name: 'Notes:' }).click();
  await page.getByRole('textbox', { name: 'Notes:' }).fill(note);
  await page.getByRole('button', { name: 'Submit ' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: ' File Form' }).click();
}

test.describe.parallel('Room inspection form submissions', () => {

  // Login before starting the parallel tests.
  // Note: If each test uses its own page, you might need to log in in a beforeEach hook
  // or use a separate context for each test.
  test.beforeAll(async ({ browser }) => {
    // We create a new context and page for the login
    const page = await browser.newPage();
    await loginToRoompact(page, roompactEmail, username, password);
    // Optionally, store cookies/local storage and reuse them in parallel tests.
    await page.context().storageState({ path: 'auth.json' });
    await page.close();
  });

  // For Passed Rooms
  for (let i = 0; i < pass.length; i++) {
    test(`Passed Room ${pass[i]}`, async ({ page }) => {
      // Reuse the authentication state
      await page.context().addCookies(require('./auth.json').cookies || []);
      await submitPassedRoom(page, pass[i], date, passKey[i]);
    });
  }

  // For Failed Rooms
  for (let i = 0; i < fail.length; i++) {
    test(`Failed Room ${fail[i]}`, async ({ page }) => {
      // Reuse the authentication state
      await page.context().addCookies(require('./auth.json').cookies || []);
      await submitFailedRoom(page, fail[i], date, failKey[i], failType[i], notes[i]);
    });
  }
});