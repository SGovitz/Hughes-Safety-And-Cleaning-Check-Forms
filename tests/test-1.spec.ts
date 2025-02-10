import { test, expect } from '@playwright/test';

test.setTimeout(600000);

/** Logs into Roompact and navigates to the Forms page */
async function loginToRoompact(page, roompactEmail, username, password) {

}

/** Fills in the common fields on the Safety & Cleaning Check Form */
async function fillCommonDetails(page, roomStr, date) {

}

/** Sets the keyed-in answers based on the keyed value (1 = keyed, 0 = not keyed) */
async function fillKeyedIn(page, keyed) {

}

/** Submits the form for a passed room */
async function submitPassedRoom(page, room, date, keyed) {

}

/** Submits the form for a failed room */
async function submitFailedRoom(page, room, date, keyed, type, note) {

}

/*
----HUGHES LAYOUT----
WEST SIDE
1st: 102, 103, 104, 105, 106, 107, 108, 109, 112, 113, 114, 115
2nd: 201, 202, 203, 204, 205, 206, 207, 208, 209, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226
3rd: 301, 302, 303, 304, 305, 306, 307, 308, 309, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326

EAST SIDE
1st: 128, 130, 132, 133, 135, 136, 137, 140, 142, 144, 146, 152
2nd: 227, 228, 229, 230, 231, 233, 234, 235, 236, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247
3rd: 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347
*/

//Website Information
const roompactEmail = 'sgovitz@cub.uca.edu';  //Email to log into roompact
const username = 'sgovitz';  //username to log into MyUCA
const password = 'Legobob-12!'; //Password to log into MyUCA
const date = '02/07/2025'; //Ex. mm/dd/year
let roomStr; //converts room to String

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


test('test', async ({ page }) => {

/***************************************************
 LOGIN TO WEBSITE
****************************************************/
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
  await page.waitForTimeout(7000); 
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.waitForTimeout(2000); 

/******************************************************
 This will run through each passed room
 - Make sure that each room # has a corresponding number
   if it was keyed in or not (0 or 1)
 ******************************************************/
  for(var i = 0; i < pass.length; i++)
  {
      roomStr = pass[i].toString();
        await page.getByRole('heading', { name: 'Safety & Cleaning Check Form' }).click();
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).click();
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).fill(date);
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).press('Enter');
        await page.getByRole('textbox', { name: 'Tag Buildings' }).click();
        await page.getByRole('textbox', { name: 'Tag Buildings' }).fill('Hughes');
        await page.waitForTimeout(1000);
        await page.locator('div').filter({ hasText: /^Hughes Hall$/ }).nth(4).click();
        await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).click();
        await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).fill(roomStr); //<-Need quotes to make string?
        await page.waitForTimeout(1000);
        await page.getByText('Hughes Hall - 2 - Room ' + roomStr + ' (RA)').click();  //<-Remove RA in final product

        /******************************************************
         If you keyed in for that specific room, this part will run
         - This goes under the asumption that if you keyed in, there
           was no residents present
         ******************************************************/
        if(passKey[i] == 1)
        {
          await page.getByRole('group', { name: 'Did you key in? (you must' }).getByLabel('Yes').check();
          await page.getByRole('group', { name: 'Was a resident present during' }).getByLabel('No').check();
        }

        /******************************************************
         If you DID NOT key in for that specific room, this part will run
         - This goes under the asumption that if you didnt key in, there
         was at least 1 resident present
         ******************************************************/
        if(passKey[i] == 0)
        {
          await page.getByRole('group', { name: 'Did you key in? (you must' }).getByLabel('No').check();
          await page.getByRole('group', { name: 'Was a resident present during' }).getByLabel('Yes').check();
        }

        await page.getByRole('radio', { name: 'Not Applicable' }).check();
        await page.getByRole('group', { name: 'The room/suite is clean.' }).getByLabel('Yes').check();
        await page.getByRole('group', { name: 'Any illegal decorations?' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'This room has passed my' }).getByLabel('Yes').check();
        await page.getByRole('textbox', { name: 'Notes:' }).click();
        await page.getByRole('textbox', { name: 'Notes:' }).fill('Void'); //<-Remove in final product
        await page.getByRole('button', { name: 'Submit ' }).click();
        await page.waitForTimeout(2000); 
        await page.getByRole('button', { name: ' File Form' }).click();
  }

  
  /******************************************************
   This will run through each failed room
   - Make sure that each room # has a corresponding number
     if it was keyed in or not (0 or 1)
   ******************************************************/
   for(var i = 0; i < fail.length; i++)
   {
      roomStr = fail[i].toString();
        await page.getByRole('heading', { name: 'Safety & Cleaning Check Form' }).click();
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).click();
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).fill(date);
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).press('Enter');
        await page.getByRole('textbox', { name: 'Tag Buildings' }).click();
        await page.getByRole('textbox', { name: 'Tag Buildings' }).fill('Hughes');
        await page.locator('div').filter({ hasText: /^Hughes Hall$/ }).nth(4).click();
        await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).click();
        await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).fill(roomStr); //<-Need quotes to make string?
        await page.waitForTimeout(1000);
        await page.getByText('Hughes Hall - 2 - Room ' + roomStr + ' (RA)').click(); //<-Remove RA in final product

        /******************************************************
         If you keyed in for that specific room, this part will run
        - This goes under the asumption that if you keyed in, there
          was no residents present
        ******************************************************/
        if(failKey[i] == 1)
        {
          await page.getByRole('group', { name: 'Did you key in? (you must' }).getByLabel('Yes').check();
          await page.getByRole('group', { name: 'Was a resident present during' }).getByLabel('No').check();
        }

        /******************************************************
         If you DID NOT key in for that specific room, this part will run
        - This goes under the asumption that if you didnt key in, there
        was at least 1 resident present
        ******************************************************/
        if(failKey[i] == 0)
        {
          await page.getByRole('group', { name: 'Did you key in? (you must' }).getByLabel('No').check();
          await page.getByRole('group', { name: 'Was a resident present during' }).getByLabel('Yes').check();
        }

        await page.getByRole('radio', { name: 'Not Applicable' }).check();

        /******************************************************
         This part marks that the room failed because it was dirty
        ******************************************************/
        if(failType[i] == 1 || failType[i] == 2)
        {
          await page.getByRole('group', { name: 'The room/suite is clean.' }).getByLabel('No').check();
        }
        else
        {
          await page.getByRole('group', { name: 'The room/suite is clean.' }).getByLabel('Yes').check();
        }

        /******************************************************
         This part marks that the room failed because it was dirty
        ******************************************************/
        if(failType[i] == 0 || failType[i] == 2)
        {
          await page.getByRole('group', { name: 'Any illegal decorations?' }).getByLabel('Yes').check();
        }
        else
        {
          await page.getByRole('group', { name: 'Any illegal decorations?' }).getByLabel('No').check();
        }

        await page.getByRole('group', { name: 'This room has passed my' }).getByLabel('No').check();
        await page.getByRole('textbox', { name: 'Notes:' }).click();
        await page.getByRole('textbox', { name: 'Notes:' }).fill(notes[i]);
        await page.getByRole('button', { name: 'Submit ' }).click();
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: ' File Form' }).click();
   }

});