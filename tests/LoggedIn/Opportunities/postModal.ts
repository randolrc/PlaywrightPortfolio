import {  Page, Locator } from '@playwright/test';

export class PostModal {
    page: Page;

    popupLoc: Locator;

    fieldNewPost: Locator;
    fieldDetails: Locator;
    fieldKeywords: Locator;
    fieldLocation: Locator;

    headingNewOpp: Locator;
    headingPostTooShort: Locator;
    headingCustomBizGoal: Locator;
    headingHiring: Locator;
    headingJobSeeking: Locator;
    headingInvesting: Locator;
    headingFundraising: Locator;
    headingSelling: Locator;
    headingSeeking: Locator;
    headingNetworking: Locator;

    headingKwdCustom: Locator;
    headingKwdHiring: Locator;
    headingKwdJobSeeking: Locator;
    headingKwdInvesting: Locator;
    headingKwdFundraising: Locator;
    headingKwdSelling: Locator;
    headingKwdSeeking: Locator;
    headingKwdNetworking: Locator;

    headingErrorShortHiring: Locator;
    headingErrorShortJob: Locator;
    headingErrorShortInvesting: Locator;
    headingErrorShortFunds: Locator;
    headingErrorShortSell: Locator;
    headingErrorShortSeek: Locator;
    headingErrorShortNetwork: Locator;

    headingHiringLoc: Locator;
    headingJobSeekingLoc: Locator;

    headingNewPost: Locator;

    headingRejectedPostBadLang: Locator

    btnNewPost: Locator;
    btnSubmitText: Locator;
    btnClose: Locator;

    btnHiring: Locator;
    btnJobSeeking: Locator;
    btnInvesting: Locator;
    btnFundraising: Locator;
    btnSelling: Locator;
    btnSeeking: Locator;
    btnNetworking: Locator;
    btnCreatePost: Locator;
    btnPublishPost: Locator;

    btnDetailsBold: Locator;
    btnDetailsItalic: Locator;
    btnDetailsUnderlined: Locator;
    btnDetailsNumber: Locator;
    btnDetailsBullet: Locator;

    btnDeleteFirstKwd: Locator;
    btnRemoteLoc: Locator;
    btnRestart: Locator;

    constructor(page: Page) {
        this.page = page;

        this.popupLoc = page.locator('.MuiBox-root.css-1curka7');

        this.fieldNewPost = page.getByRole('textbox');
        this.fieldDetails = page.getByRole('textbox');
        this.fieldKeywords = page.locator('input#keywords');
        this.fieldLocation = page.getByPlaceholder('San Francisco, CA');

        this.headingNewOpp = page.getByRole('heading', { name: 'Post a new opportunity' });
        this.headingPostTooShort = page.getByText('Thanks! Posts do better when you add more details. What else would someone responding want to know about your opportunity?');
        this.headingCustomBizGoal = page.getByRole('heading', { name: 'Thanks! Let\'s add some keywords to help us target the right people.' });
        this.headingHiring = page.getByRole('heading', { name: 'Great! Tell me about the role you’re hiring.\nTo find the best matches we recommend you include:\n1. The title, company name and location\n2. General responsibilities for the role\n3. Expected skills, certifications or experience' })
        this.headingJobSeeking = page.getByRole('heading', { name: 'Great! Tell me more about the type of roles you are looking for.\nTo find the best matches we recommend you include:\n1. Departments, roles and titles you are targeting\n2. Your target industries and locations\n3. The experience and skills you bring to the table' });
        this.headingInvesting = page.getByRole('heading', { name: 'Great! Tell me more about your investment focus.\nTo find the best matches we recommend you include:\n1. Stages and round sizes you invest in\n2. Industries, sectors or geographies you focus on\n3. Expertise and experience that you bring to the table' });
        this.headingFundraising = page.getByRole('heading', { name: 'Great! Tell me more about your investment opportunity.\nTo find the best matches we recommend you include:\n1. Your elevator pitch\n2. Stage, industry and region\n3. Key metrics that make you stand out' });
        this.headingSelling = page.getByRole('heading', { name: 'Great! Tell me more about your product or service.\nTo find the best matches we recommend you include:\n1. Who are you trying to reach\n2. What problem are you solving\n3. What makes you the best choice' });
        this.headingSeeking = page.getByRole('heading', { name: 'Great! Tell me more about what you are looking for.\nTo find the best matches we recommend you include:\n1. Details about service or product you are looking for\n2. Any must-haves or deal-breakers\n3. The timeline you are expecting' });
        this.headingNetworking = page.getByRole('heading', { name: 'Great! Tell me more about who you are looking to connect with' });

        this.headingRejectedPostBadLang = page.getByText('Oops. We insist on decorum on the twocents network.Please rephrase your post.');
        
        this.headingKwdCustom = page.getByRole('heading', { name: 'Thanks! Let\'s add some keywords to help us target the right people.' });
        this.headingKwdHiring = page.getByRole('heading', { name: 'Thanks! Let\'s add some keywords to help us target the right job seekers.' });
        this.headingKwdJobSeeking = page.getByRole('heading', { name: 'Thanks! Let\'s add some keywords to help us target the right hiring managers.' });
        this.headingKwdInvesting = page.getByRole('heading', { name: 'Thanks! Let\'s add some keywords to help us target the right audience.' });
        this.headingKwdFundraising = page.getByRole('heading', { name: 'Thanks! Let\'s add some keywords to help us target the right investors.' });
        this.headingKwdSelling = page.getByRole('heading', { name: 'Thanks! Let\'s add some keywords to help us target the right buyers.' });
        this.headingKwdSeeking = page.getByRole('heading', { name: 'Thanks! Let’s add some keywords to help us target the right people.' });
        this.headingKwdNetworking = page.getByRole('heading', { name: 'Thanks! Let’s add some keywords to help us target the right people.' });

        this.headingHiringLoc = page.getByRole('heading', { name: 'Where is this role located?' });
        this.headingJobSeekingLoc = page.getByRole('heading', { name: 'Where are you looking for work?' });

        this.headingNewPost = page.getByRole('heading', { name: 'Hello! What business goal can we help you with?' });

        this.headingErrorShortHiring = page.getByText('Thanks! Posts do better when you add more details. Make sure you included the role title, location, expectations and goals.');
        this.headingErrorShortJob = page.getByText('Thanks! Posts do better when you add more details. Make sure you included industries you care about, titles you would be interested in and any unique skills you bring to the table.');
        this.headingErrorShortInvesting = page.getByText('Thanks! Posts do better when you add more details. Make sure you included industries and geographies you invest in, what rounds and investment levels are a fit and other details about what makes you a great partner.');
        this.headingErrorShortFunds = page.getByText('Thanks! Posts do better when you add more details. Make sure you included your elevator pitch and details like your industry, geography and the round you’re raising.');
        this.headingErrorShortSell = page.getByText('Thanks! Posts do better when you add more details. Make sure you included details about your offering and what makes you stand out from the competition.');
        this.headingErrorShortSeek = page.getByText('Thanks! Posts do better when you add more details. Make sure you included details about what you need like timeline or any unique requirements.');
        this.headingErrorShortNetwork = page.getByText('Thanks! Posts do better when you add more details. Make sure you included any details someone would want to know about this.');

        this.btnNewPost = page.getByRole('button', { name: 'Post Opportunity' });
        this.btnSubmitText = page.locator('.css-r6zapq > .MuiButtonBase-root');
        this.btnClose = page.locator('.css-ddcuv9 > .MuiSvgIcon-root > path');

        this.btnHiring = page.getByRole('button', { name: 'Hiring' });
        this.btnJobSeeking = page.getByRole('button', { name: 'Job Seeking' });
        this.btnInvesting = page.getByRole('button', { name: 'Investing' });
        this.btnFundraising = page.getByRole('button', { name: 'Fundraising' });
        this.btnSelling = page.getByRole('button', { name: 'Selling Products or Services' });
        this.btnSeeking = page.getByRole('button', { name: 'Seeking Products or Services' });
        this.btnNetworking = page.getByRole('button', { name: 'Networking' });

        this.btnDetailsBold = page.getByRole('button').filter({ hasText: 'format_bold' });
        this.btnDetailsItalic = page.getByRole('button').filter({ hasText: 'format_italic' });
        this.btnDetailsUnderlined = page.getByRole('button').filter({ hasText: 'format_underlined' });
        this.btnDetailsNumber = page.getByRole('button').filter({ hasText: 'format_list_numbered' });
        this.btnDetailsBullet = page.getByRole('button').filter({ hasText: 'format_list_bulleted' });

        this.btnDeleteFirstKwd = page.locator(".MuiChip-deleteIconFilledColorDefault").first();
        this.btnRemoteLoc = page.getByRole('button', { name: 'Remote' });
        this.btnCreatePost = page.locator('button.MuiButton-containedPrimary');
        this.btnRestart = page.getByTestId('RestartAltIcon');
        this.btnPublishPost = page.getByRole('button', { name: 'Publish Opportunity' });
    }

    async goto() {
        await this.page.goto("/faq");
        await this.page.waitForLoadState("networkidle"); 
    }

    async submitTestPost(postDetails: string, kwd1: string, kwd2: string) {
        await this.btnNewPost.click();
        await this.btnHiring.click();
        await this.page.waitForLoadState("networkidle");
        await this.fieldDetails.click();
        await this.fieldDetails.type(postDetails);
        await this.btnSubmitText.click();
        await this.headingHiring.waitFor();
        await this.fieldKeywords.click();
        await this.fieldKeywords.type(kwd1);
        await this.fieldKeywords.press('Enter');
        await this.fieldKeywords.type(kwd2);
        await this.fieldKeywords.press('Enter');
        await this.btnSubmitText.click();

        await this.headingHiringLoc.waitFor();
        await this.page.waitForLoadState("networkidle"); 
        await this.fieldLocation.click();
        await this.page.waitForTimeout(1000);
        await this.fieldLocation.type('Oakland, CA');
        await this.page.getByText('Oakland').first().click();
        await this.page.waitForLoadState("networkidle"); 

        await this.page.waitForTimeout(1000);
        await this.btnSubmitText.click();
        await this.page.waitForLoadState("networkidle"); 

        await this.page.waitForTimeout(1000);
        let req = await this.clickSubmitPostButton();

        
           
        return req; 
    }

    async clickSubmitPostButton() {
        let reqPromise = this.page.waitForRequest('/api/post/create');

        await this.btnCreatePost.click();
        let req = await reqPromise;

        await this.page.waitForLoadState("networkidle"); 
        await this.page.waitForTimeout(5 * 1000);

        return req;
    }

}