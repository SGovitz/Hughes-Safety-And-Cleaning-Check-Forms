import { test, expect } from '@playwright/test';
//Website Information
const roompactEmail = 'sgovitz@cub.uca.edu';
const username = 'sgovitz';
const password = 'Legobob-12!';
const date = '02/05/2025'; //Ex. mm/dd/year

//Update this with all the rooms that passed****************
const pass = [];

//Ex. 1 -> Keyed into room
//    0 -> Did not key into room
const passKey = [];

//Update this with all the rooms that failed****************
const fail = []; 

//Ex. 1 -> Keyed into room
//    0 -> Did not key into room
const failKey = [];

//Ex. 1 -> Clean: This room failed because room was dirty
//    0 -> Illegal: This room failed because it had illegal decorations (alcohol, candles, microwave, etc)
const failType = [];

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
  await page.waitForTimeout(5000); 
  await page.getByRole('link', { name: 'Forms' }).click();

/******************************************************
 This will run through each passed room
 - Make sure that each room # has a corresponding number
   if it was keyed in or not (0 or 1)
 ******************************************************/
  for(var i = 0; i <= pass.length; i++)
  {
    /******************************************************
     If you keyed in for that specific room, this part will run
      - This goes under the asumption that if you keyed in, there
        was no residents present
     ******************************************************/
    if(passKey[i] == 1)
    {
        await page.getByRole('heading', { name: 'Safety & Cleaning Check Form' }).click();
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).click();
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).fill(date);
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).press('Enter');
        await page.getByRole('textbox', { name: 'Tag Buildings' }).click();
        await page.getByRole('textbox', { name: 'Tag Buildings' }).fill('Hughes');
        await page.locator('div').filter({ hasText: /^Hughes Hall$/ }).nth(4).click();
        await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).click();
        await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).fill(pass[i]); //<-Need quotes to make string?
        await page.getByText('Hughes Hall - 2 - Room ' + pass[i]).click();
        await page.getByRole('group', { name: 'Did you key in? (you must' }).getByLabel('Yes').check();
        await page.getByRole('group', { name: 'Was a resident present during' }).getByLabel('No').check();
        await page.getByRole('radio', { name: 'Not Applicable' }).check();
        await page.getByRole('group', { name: 'The room/suite is clean.' }).getByLabel('Yes').check();
        await page.getByRole('group', { name: 'Any illegal decorations?' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'This room has passed my' }).getByLabel('Yes').check();
        await page.getByRole('textbox', { name: 'Notes:' }).click();
        await page.getByRole('textbox', { name: 'Notes:' }).fill('this is the automatic test (if this sends, that means it works)'); //<-Remove in final product
        await page.getByRole('button', { name: 'Submit ' }).click();
        await page.getByRole('button', { name: ' File Form' }).click();
    }

    /******************************************************
     If you DID NOT key in for that specific room, this part will run
      - This goes under the asumption that if you didnt key in, there
        was at least 1 resident present
     ******************************************************/
    if(passKey[i] == 0)
    {
        await page.getByRole('heading', { name: 'Safety & Cleaning Check Form' }).click();
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).click();
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).fill(date);
        await page.getByRole('textbox', { name: 'Enter date for Today\'s Date.' }).press('Enter');
        await page.getByRole('textbox', { name: 'Tag Buildings' }).click();
        await page.getByRole('textbox', { name: 'Tag Buildings' }).fill('Hughes');
        await page.locator('div').filter({ hasText: /^Hughes Hall$/ }).nth(4).click();
        await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).click();
        await page.getByRole('textbox', { name: 'Tag Suites or Rooms' }).fill('237');
        await page.getByText('Hughes Hall - 2 - Room 237 (RA)').click();
        await page.getByRole('group', { name: 'Did you key in? (you must' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'Was a resident present during' }).getByLabel('Yes').check();
        await page.getByRole('radio', { name: 'Not Applicable' }).check();
        await page.getByRole('group', { name: 'The room/suite is clean.' }).getByLabel('Yes').check();
        await page.getByRole('group', { name: 'Any illegal decorations?' }).getByLabel('No').check();
        await page.getByRole('group', { name: 'This room has passed my' }).getByLabel('Yes').check();
        await page.getByRole('textbox', { name: 'Notes:' }).click();
        await page.getByRole('textbox', { name: 'Notes:' }).fill('this is the automatic test (if this sends, that means it works)');
        await page.getByRole('button', { name: 'Submit ' }).click();
        await page.getByRole('button', { name: ' File Form' }).click();
    }
  }

  
/******************************************************
 This will run through each failed room
 - Make sure that each room # has a corresponding number
   if it was keyed in or not (0 or 1)
 ******************************************************/
   for(var i = 0; i <= fail.length; i++)
    {
      /******************************************************
       If you keyed in for that specific room, this part will run
        - This goes under the asumption that if you keyed in, there
          was no residents present
       ******************************************************/
      if(failKey[i] == 1)
      {
         
      }
  
      /******************************************************
       If you DID NOT key in for that specific room, this part will run
        - This goes under the asumption that if you didnt key in, there
          was at least 1 resident present
       ******************************************************/
      if(failKey[i] == 0)
      {
        
      }
    }

});