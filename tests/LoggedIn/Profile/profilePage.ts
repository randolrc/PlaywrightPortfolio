import { test, expect, Page, Locator, APIRequestContext } from '@playwright/test';

export class ProfilePage {
    page: Page;

    profileSection: Locator;

    viewProfileImg: Locator;
    viewPindropIcon: Locator;
    viewCompanyName: Locator;
    viewPosition: Locator;

    btnProfileImg: Locator;
    fieldFirstName: Locator;
    fieldLastName: Locator;
    fieldCompanyName: Locator;
    fieldPosition: Locator;
    fieldLocation: Locator;
    fieldKeywords: Locator;
    fieldDescription: Locator;

    btnEditProfile: Locator;
    btnClearKeywords: Locator;
    btnSaveProfile: Locator;
    btnCancel: Locator;
    btnCreate: Locator;
    btnCloseWelcome: Locator;

    notifySavedProfile: Locator;
    notifyRequired: Locator;

    constructor(page: Page) {
        this.page = page;

        this.viewProfileImg = page.getByRole('img', { name: 'profile image' });
        this.viewPindropIcon = page.getByTestId('PinDropIcon');
        this.viewCompanyName = page.getByText('Company name');
        this.viewPosition = page.getByText('Position');

        this.btnProfileImg = page.getByRole('img', { name: 'Add profile photo' });
        this.fieldFirstName = page.getByPlaceholder('First Name');
        this.fieldLastName = page.getByPlaceholder('Last Name');
        this.fieldCompanyName = page.getByPlaceholder('Company');
        this.fieldPosition = page.getByPlaceholder('Job Title');
        this.fieldLocation = page.getByPlaceholder('Location');
        this.fieldKeywords = page.locator('#keywords');
        this.fieldDescription = page.getByPlaceholder('describe what you do for work');

        this.btnEditProfile = page.getByRole('button', { name: 'Edit Profile' });
        this.btnSaveProfile = page.getByRole('button', { name: 'Save Profile' });
        this.btnClearKeywords = page.getByRole('button', { name: 'Clear' });
        this.btnCancel = page.getByRole('button', { name: 'Cancel' });
        this.btnCreate = page.getByText('Create Profile');
        this.btnCloseWelcome = page.getByText('Create Profile');
        

        this.notifySavedProfile = page.getByText('Saved profile.');
        this.notifyRequired = page.getByText('*Required');

        this.profileSection = page.getByText('Your ProfileProfile PictureYour NameFirst Name must be at least 2 charactersLast');
    }

    async goto() {

        await this.page.goto('/profile');
        await this.page.waitForLoadState("networkidle"); 

    }

    async setEmptyProfile(request: APIRequestContext) {
        let json = JSON.parse('{"imageUrl":"https://cdn.twocents.io/p/f9aea043-9b72-4db7-9ed9-a196c4b41a4f.webp","color":{"id":"63f533193298805d568715ef","primary":"#DD9EE8","secondary":"#B66BC4","tertiary":"#771467"},"firstName":"Carter","lastName":"Test","location":"","jobTitle":"","companyName":"","geolocation":{"latitude":0,"longitude":0},"investorType":"","jobNext":"","jobDescription":"","keywords":[],"selfTags":[],"domainTags":[]}');


        await request.post('https://staging.twocents.io/api/profile', {data: json});
    }

    async setDefaultProfile(request: APIRequestContext) {

        let json = JSON.parse('{"imageUrl":"https://cdn.twocents.io/p/f9aea043-9b72-4db7-9ed9-a196c4b41a4f.webp","color":{"id":"63f533193298805d568715ef","primary":"#DD9EE8","secondary":"#B66BC4","tertiary":"#771467"},"firstName":"Carter","lastName":"Test","location":"San Francisco, CA, USA","jobTitle":"QA","companyName":"TwoCents","geolocation":{"latitude":0,"longitude":0},"investorType":"","jobNext":"","jobDescription":"I like things","keywords":["Kwd1","Kwd2","Kwd3"],"selfTags":[],"domainTags":[]}');

        await request.post('https://staging.twocents.io/api/profile', {data: json});
    }

    async populateFieldsDefault() {
        await this.fieldFirstName.fill('Carter');
        await this.fieldLastName.fill('Test');
        await this.fieldCompanyName.fill('Twocents');
        await this.fieldPosition.fill('QA');
        await this.fieldLocation.clear();
        await this.fieldLocation.click();
        await this.fieldLocation.type('San Francisco');
        await this.page.getByText('San FranciscoCA, USA').first().click();
    
        await this.fieldKeywords.click();
        if (await this.btnClearKeywords.isVisible()) {
            await this.btnClearKeywords.click();
        }
    
        await this.fieldKeywords.type('kwd1');
        await this.fieldKeywords.press('Enter');
        await this.fieldKeywords.type('kwd2');
        await this.fieldKeywords.press('Enter');
        await this.fieldKeywords.type('kwd3');
        await this.fieldKeywords.press('Enter');
    
    
        await this.fieldDescription.fill('I like things');
    }

    async verifySavedFieldsDefault() {
        await expect(this.page.getByText('Carter Test').nth(1)).toBeVisible();
        await expect(this.page.getByText('QA at Twocents')).toBeVisible();
        await expect(this.page.getByText('Kwd1')).toBeVisible();
        await expect(this.page.getByText('Kwd2')).toBeVisible();
        await expect(this.page.getByText('Kwd3')).toBeVisible();
        await expect(this.page.getByText('I like things')).toBeVisible();
    }
}

