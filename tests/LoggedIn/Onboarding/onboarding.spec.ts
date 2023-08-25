import { test, expect } from '@playwright/test';
import * as stoStrings from '../../util/storageStrings';
import { ProfilePage } from '../Profile/profilePage';
import { Helper } from '../../util/helper';
import { OnbPage } from './onbPage';

let profilePage: ProfilePage;
let onbPage: OnbPage;

test.use({ storageState: stoStrings.TWOCENTS_LOGIN_ONB });
test('@smoke skip onboarding, complete onboarding flow', async ({ page, browserName, headless, isMobile, request }) => {

    profilePage = new ProfilePage(page);
    onbPage = new OnbPage(page);

    let details = 'Here are some details about me.';

    await profilePage.setEmptyProfile(request);

    await onbPage.goto();
    
    await Helper.checkContent(page, '', headless, 'welcome', browserName);

    await onbPage.btnSkip.click();
    await page.waitForURL('/profile');
    await profilePage.btnCloseWelcome.click();

    await onbPage.goto();
    await onbPage.btnLetsGo.click();
    await onbPage.btnBack.click();
    await Helper.checkContent(page, '', headless, 'welcome', browserName);
    await onbPage.btnLetsGo.click();

    await Helper.checkContent(page, '', headless, 'tagsNoneSelected', browserName);

    await onbPage.addAllTags();

    await Helper.checkContent(page, '', headless, 'tagsAllSelected', browserName);

    await onbPage.btnNext.click();
    await onbPage.btnBack.click();
    await Helper.checkContent(page, '', headless, 'tagsAllSelected', browserName);
    await onbPage.btnNext.click();

    await Helper.checkContent(page, '', headless, 'jobSearchEmpty', browserName);

    await onbPage.dropdownLFW.click();
    await onbPage.selectionLFWYes.click();

    await onbPage.dropdownExp.click();
    await onbPage.selectionExpInt.click();

    await onbPage.btnNext.click();
    await onbPage.btnBack.click();
    await Helper.checkContent(page, '', headless, 'jobSearchSelections', browserName);
    await onbPage.btnNext.click();

    await Helper.checkContent(page, '', headless, 'userBlurbEmpty', browserName);

    await onbPage.fieldDetails.click();
    await onbPage.fieldDetails.type(details);
    await Helper.checkContent(page, '', headless, 'userBlurbFilled', browserName);

    await onbPage.btnNext.click();
    await onbPage.btnBack.click();
    await Helper.checkContent(page, '', headless, 'userBlurbFilled', browserName);
    await onbPage.btnNext.click();

    await Helper.checkContent(page, '', headless, 'userDetailsEmpty', browserName);

    await onbPage.fieldJobTitle.click();
    await onbPage.fieldJobTitle.type('QA');
    await onbPage.fieldCompany.click();
    await onbPage.fieldCompany.type('TC');
    await onbPage.btnDone.click();

    await page.getByRole('img', { name: 'twocents-logo' }).hover();
    await page.getByLabel('Collapse').click();
    await profilePage.btnEditProfile.click();

    await Helper.checkContent(page, '', headless, 'savedProfile', browserName);
});

test('set random tags, confirm save', async ({ page, browserName, headless, isMobile, request }) => {
    profilePage = new ProfilePage(page);
    onbPage = new OnbPage(page);

    await profilePage.setEmptyProfile(request);

    await onbPage.goto();
    await onbPage.btnLetsGo.click();
    let tagsChosen = await onbPage.chooseRandomTags();

    await onbPage.btnNext.click();

    if (tagsChosen.includes(onbPage.jobSeeking)) {
        await onbPage.btnNext.click();
    }

    await onbPage.btnNext.click();
    await onbPage.fieldCompany.fill('TC');
    await onbPage.btnDone.click();

    await profilePage.btnCloseWelcome.click();
    await profilePage.btnEditProfile.click();

    for (let i=0; i < tagsChosen.length; i++) {
        await expect(page.getByText(tagsChosen[i], {exact: true})).toBeVisible();
    }
});

test('5k char limit on description', async ({ page, browserName, headless, isMobile, request }) => {
    profilePage = new ProfilePage(page);
    onbPage = new OnbPage(page);

    let descText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod in purus quis euismod. Sed sed consectetur urna. Nullam eros justo, pulvinar sed felis vel, ornare pretium purus. Etiam sit amet libero et magna condimentum porta ac id eros. Aliquam semper imperdiet eros, nec accumsan purus cursus non. Quisque ut ante pharetra, commodo nisl vitae, pretium odio. Donec quam mauris, consectetur ac tellus non, dignissim congue dolor. Etiam iaculis in mauris quis porta. Curabitur egestas gravida ';

    await profilePage.setEmptyProfile(request);

    await onbPage.goto();
    await onbPage.btnLetsGo.click();

    await onbPage.btnNext.click();

    await onbPage.fieldDetails.click();

    await onbPage.fieldDetails.type(descText);

    await expect(page.getByText('500/5000')).toBeVisible();

    let longDescText = descText + descText + descText + descText + descText + descText + descText + descText + descText + descText;

    await onbPage.fieldDetails.fill(longDescText);

    await expect(page.getByText('5000/5000')).toBeVisible();

    await onbPage.fieldDetails.type('1');

    await expect(page.getByText('5001/5000 Description must be at most 5000 characters')).toBeVisible();

    await onbPage.btnNext.click();
    await expect(onbPage.fieldCompany).toBeHidden();

    await onbPage.fieldDetails.press('Backspace');
    await expect(page.getByText('5000/5000')).toBeVisible();

    await onbPage.btnNext.click();
    await expect(onbPage.fieldCompany).toBeVisible();
    
});
