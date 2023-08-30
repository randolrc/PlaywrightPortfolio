import { test, expect, Page, Locator, BrowserContext } from '@playwright/test';
import { Helper } from '@util/helper';
import * as stoStrings from '@util/storageStrings';
import { ProfilePage } from '@pages/profilePage';

test.use({ storageState: stoStrings.TWOCENTS_LOGIN });

let profilePage:ProfilePage;

test('@smoke Edit and save profile', async ({ page, headless, isMobile, browserName, context, request }) => {

    profilePage = new ProfilePage(page);
    await profilePage.setEmptyProfile(request);

    await profilePage.goto();
    await profilePage.btnCreate.click();

    await Helper.checkContent(page, "", headless, 'NoProfileSetup', browserName);

    await uploadProfilePic(page, 'jack.jpg');

    await populateFieldsAndSave(page);
    await Helper.checkContentTarget(profilePage.viewProfileImg, headless, 'savedProfilePic1', browserName);

    await profilePage.btnEditProfile.click();

    await uploadProfilePic(page, 'samus.png');

    await populateFieldsAndSave(page);
    await Helper.checkContentTarget(profilePage.viewProfileImg, headless, 'savedProfilePic2', browserName);

    await verifyRequiredFields(page);
    await trySendingLotsOfText(page);
    await verifyKeepEditOpenOnFocusLoss(page, context);

    await profilePage.populateFieldsDefault();
    await profilePage.btnSaveProfile.click();
});

async function uploadProfilePic(page: Page, filename: string) {
    const fileChooserPromise = page.waitForEvent('filechooser');
    await profilePage.btnProfileImg.click({force: true});
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(`./tests/LoggedIn/Profile/profilePics/${filename}`);
}

async function populateFieldsAndSave(page: Page) {

    const randFirstName = 'Carter ' +  Helper.genRandHex(6);
    const randLastName = 'Randolph ' +  Helper.genRandHex(6);
    const randCompName = 'TwoCents ' + Helper.genRandHex(6);
    const randJobTitle = 'QA '+ Helper.genRandHex(6);
    const randLocation = 'Springfield ' + Helper.genRandHex(6);
    const randKeywords1 = "Startups " + Helper.genRandHex(6);
    const randKeywords2 = "AI " + Helper.genRandHex(6);
    const randKeywords3 = "Testing " + Helper.genRandHex(6);
    const randDesc = "Reading books " + Helper.genRandHex(6);

    await profilePage.fieldFirstName.click();
    await profilePage.fieldFirstName.fill(randFirstName);
    await profilePage.fieldLastName.click();
    await profilePage.fieldLastName.fill(randLastName);

    await profilePage.fieldCompanyName.click();
    await profilePage.fieldCompanyName.fill(randCompName);

    await profilePage.fieldPosition.click();
    await profilePage.fieldPosition.fill(randJobTitle);

    await profilePage.fieldLocation.click();
    await profilePage.fieldLocation.fill(randLocation);

    await profilePage.fieldKeywords.click();

    if (await profilePage.btnClearKeywords.count() === 1)
        await profilePage.btnClearKeywords.click();

    await profilePage.fieldKeywords.fill(randKeywords1);
    await profilePage.fieldKeywords.press('Enter');

    await profilePage.fieldKeywords.type(randKeywords2);
    await profilePage.fieldKeywords.type(',');

    await profilePage.fieldKeywords.type(randKeywords3);
    await profilePage.fieldKeywords.type(',');

    await profilePage.btnClearKeywords.click();

    await profilePage.fieldKeywords.fill(randKeywords1);
    await profilePage.fieldKeywords.type(',');

    await profilePage.fieldKeywords.type(randKeywords2);
    await profilePage.fieldKeywords.press('Enter');

    await profilePage.fieldKeywords.type(randKeywords3);

    await profilePage.fieldDescription.click();
    await profilePage.fieldDescription.fill(randDesc);

    await profilePage.btnSaveProfile.click();
    await profilePage.notifySavedProfile.click();
    await page.reload();
    await page.waitForLoadState("networkidle"); 

    const locName =  page.getByText(randFirstName + ' ' + randLastName, {exact: true}).nth(1);
    const locJob =  page.getByText(`${randJobTitle} at ${randCompName}`, {exact: true});
    const locLocation =  page.getByText(randLocation, {exact: true});
    const locKwd1 =  page.getByText(randKeywords1);
    const locKwd2 =  page.getByText(randKeywords2);
    const locKwd3 =  page.getByText(randKeywords3);
    const locDesc =  page.getByText(randDesc, {exact: true});

    await expect(locName).toBeVisible();
    await expect(locJob).toBeVisible();
    await expect(locLocation).toBeVisible();
    await expect(locKwd1).toBeVisible();
    await expect(locKwd2).toBeVisible();
    await expect(locKwd3).toBeVisible();
    await expect(locDesc).toBeVisible();
}

async function verifyKeepEditOpenOnFocusLoss(page: Page, context: BrowserContext) {
    
    await profilePage.btnEditProfile.click();

    let p = await context.newPage();
    await p.close();

    await page.waitForTimeout(1000);

    await profilePage.fieldKeywords.click();
    await expect(page.getByText('Your Name')).toBeVisible();
}

async function verifyRequiredFields(page: Page) {
    await profilePage.btnEditProfile.click();

    await profilePage.fieldFirstName.fill('');
    await expect(profilePage.notifyRequired).toBeVisible();
    await profilePage.btnSaveProfile.click(); //nothing happens on save
    await profilePage.fieldFirstName.fill('Carter');

    await profilePage.fieldLastName.fill('');
    await expect(profilePage.notifyRequired).toBeVisible();
    await profilePage.btnSaveProfile.click();
    await profilePage.fieldLastName.fill('Test');

    await profilePage.fieldCompanyName.fill('');
    await expect(profilePage.notifyRequired).toBeHidden();
    await profilePage.fieldCompanyName.fill('Company name');

    await profilePage.fieldPosition.fill('');
    await expect(profilePage.notifyRequired).toBeHidden();
    await profilePage.fieldPosition.fill('Position');

    await profilePage.fieldCompanyName.fill('');
    await profilePage.fieldPosition.fill('');
    await expect(profilePage.notifyRequired).toHaveCount(2);
    await profilePage.btnSaveProfile.click();

    //verify can save with either company name or position
    await profilePage.fieldCompanyName.fill('Company name');
    await page.waitForTimeout(1000);
    await profilePage.btnSaveProfile.click();
    await profilePage.viewPindropIcon.waitFor();
    await expect(profilePage.viewCompanyName).toBeVisible();
    await profilePage.btnEditProfile.click();

    await page.waitForTimeout(1000);
    await profilePage.fieldPosition.fill('Position');
    await page.waitForTimeout(1000);
    await profilePage.fieldCompanyName.fill('');
    await page.waitForTimeout(1000);
    await profilePage.btnSaveProfile.click();
    await page.waitForTimeout(1000);
    await profilePage.viewPindropIcon.waitFor();
    await expect(profilePage.viewPosition).toBeVisible();
}

async function trySendingLotsOfText(page: Page) {
    let lotsOfText = Helper.genRandHex(4000);

    await profilePage.btnEditProfile.click();
    await profilePage.fieldFirstName.fill(lotsOfText);
    await profilePage.btnSaveProfile.click();
    await page.waitForLoadState("networkidle"); 
    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(page.getByText(lotsOfText)).toBeHidden();
}


test('Save profile with no changes, verify no changes', async ({ page, headless, isMobile, browserName, context }) => {

    profilePage = new ProfilePage(page);

    await profilePage.goto();
    await profilePage.btnCloseWelcome.click();
    await profilePage.btnEditProfile.click();

    await profilePage.populateFieldsDefault();

    await profilePage.btnSaveProfile.click();

    await profilePage.verifySavedFieldsDefault();
    
    await profilePage.btnEditProfile.click();
    await profilePage.btnSaveProfile.click();

    await profilePage.verifySavedFieldsDefault();
});

test('kwd added and saved after hitting Save button (no need to hit enter or ,)', async ({ page, headless, isMobile, browserName, context }) => {
    profilePage = new ProfilePage(page);

    let randHex = Helper.genRandHex(6);

    await profilePage.goto();
    await profilePage.btnCloseWelcome.click();
    await profilePage.btnEditProfile.click();

    await profilePage.fieldKeywords.hover();
    await profilePage.btnClearKeywords.click();
    await profilePage.fieldKeywords.type(randHex);

    await profilePage.btnSaveProfile.click();
    await expect(page.getByText(randHex)).toBeVisible();
});

test('saving with empty whitespace in fields', async ({ page, headless, isMobile, browserName, context }) => {
    profilePage = new ProfilePage(page);

    await profilePage.goto();
    await profilePage.btnCloseWelcome.click();
    await profilePage.btnEditProfile.click();

    await profilePage.populateFieldsDefault();
    await profilePage.btnSaveProfile.click();
    await profilePage.btnEditProfile.click();

    await profilePage.fieldFirstName.fill('  ');
    await profilePage.fieldLastName.fill('  ');
    await profilePage.fieldCompanyName.fill('  ');
    await profilePage.fieldPosition.fill('  ');
    await profilePage.fieldLocation.fill('  ');
    await profilePage.fieldDescription.fill('  ');

    await Helper.checkContentTarget(profilePage.profileSection, headless, 'whitespaceErrors', browserName);

    await profilePage.btnSaveProfile.click();
    await page.waitForTimeout(2000);
    await expect(profilePage.btnSaveProfile).toBeVisible();

    await page.reload();

    await profilePage.verifySavedFieldsDefault();
});