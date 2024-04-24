import { test, expect, Page, Locator, APIRequestContext } from '@playwright/test';
import { Helper } from '../../util/helper';

export class OnbPage {

    page: Page;

    static txtJobSeeking = 'Job Seeking';
    static txtHiring = 'Hiring';
    static txtInvesting = 'Investing';
    static txtFundraising = 'Fundraising';
    static txtNetworking = 'Networking';
    static txtSelling = 'Selling Services';
    static txtSaas = 'SaaS';
    static txtSeeking = 'Seeking Services';
    static txtSeriesA = 'Series A';
    static txtHealthcare = 'Healthcare';
    static txtAi = 'AI';
    static txtBiotech = 'Biotech';
    static txtFounder = 'Founder';
    static txtSeed = 'Seed Stage';
    static txtEdu = 'Education';
    static txtEnergy = 'Energy';
    static txtFinance = 'Finance';
    static txtMarketing = 'Marketing';
    static txtEngineering = 'Engineering';
    static txtPm = 'Product Management';

    constructor(page: Page,
            public btnSkip = page.getByRole('button', { name: 'Skip' }),
            public btnLetsGo = page.getByRole('button', { name: 'Let\'s go' }),
            public btnBack = page.getByRole('button', { name: 'Back' }),
            public btnNext = page.getByRole('button', { name: 'Next' }),
            public btnDone = page.getByRole('button', { name: 'Done' }),

            public btnJobSeeking = page.getByRole('button', { name: OnbPage.txtJobSeeking }),
            public btnHiring = page.getByRole('button', { name: OnbPage.txtHiring }),
            public btnInvesting = page.getByRole('button', { name: OnbPage.txtInvesting }),
            public btnFundraising = page.getByRole('button', { name: OnbPage.txtFundraising }),
            public btnNetworking = page.getByRole('button', { name: OnbPage.txtNetworking }),
            public btnSelling = page.getByRole('button', { name: OnbPage.txtSelling }),
            public btnSaas = page.getByRole('button', { name: OnbPage.txtSaas }),
            public btnSeeking = page.getByRole('button', { name: OnbPage.txtSeeking }),
            public btnSeriesA = page.getByRole('button', { name: OnbPage.txtSeriesA  }),
            public btnHealthcare = page.getByRole('button', { name: OnbPage.txtHealthcare }),
            public btnAI = page.getByRole('button', { name: OnbPage.txtAi, exact: true }),
            public btnBiotech = page.getByRole('button', { name: OnbPage.txtBiotech }),
            public btnFounder = page.getByRole('button', { name: OnbPage.txtFounder }),
            public btnSeed = page.getByRole('button', { name: OnbPage.txtSeed }),
            public btnEdu = page.getByRole('button', { name: OnbPage.txtEdu }),
            public btnEnergy = page.getByRole('button', { name: OnbPage.txtEnergy }),
            public btnFinance = page.getByRole('button', { name: OnbPage.txtFinance }),
            public btnMarketing = page.getByRole('button', { name: OnbPage.txtMarketing }),
            public btnEngineering = page.getByRole('button', { name: OnbPage.txtEngineering }),
            public btnPM = page.getByRole('button', { name: OnbPage.txtPm }),
            public btnCustom = page.getByRole('button', { name: 'Custom', exact: true }),

            public dropdownLFW = page.locator('div[id="job-seeking"]'),
            public selectionLFWYes = page.getByRole('option', { name: 'Yes, I am looking for a job' }),
            public selectionLFWNo = page.getByRole('option', { name: 'No, not job seeking right now' }),

            public dropdownExp = page.locator('div[id="experience"]'),
            public selectionExpInt = page.getByRole('option', { name: 'Internship' }),
            public selectionExpEntry = page.getByRole('option', { name: 'Entry Level' }),
            public selectionExpExp = page.getByRole('option', { name: 'Experienced' }),

            public fieldCustom = page.getByRole('textbox'),
            public fieldDetails = page.getByPlaceholder('This info will appear on your twocents profile to help others get to know you'),
            public fieldJobTitle = page.getByPlaceholder('Your job title'),
            public fieldCompany = page.getByPlaceholder('Company')
        ) {
        this.page = page;
    }

    
    async goto() {

        await this.page.goto('/profile?showOnboarding=true');
        await this.page.waitForLoadState("networkidle");

    }

    async addAllTags() {
        await this.btnJobSeeking.click();
        await this.btnHiring.click();
        await this.btnInvesting.click();
        await this.btnFundraising.click();
        await this.btnNetworking.click();
        await this.btnSelling.click();
        await this.btnSaas.click();
        await this.btnSeeking.click();
        await this.btnSeriesA.click();
        await this.btnHealthcare.click();
        await this.btnAI.click();
        await this.btnBiotech.click();
        await this.btnFounder.click();
        await this.btnSeed.click();
        await this.btnEdu.click();
        await this.btnEnergy.click();
        await this.btnFinance.click();
        await this.btnMarketing.click();
        await this.btnEngineering.click();
        await this.btnPM.click();
        await this.btnCustom.click();

        await this.fieldCustom.type('customTag1');
        await this.fieldCustom.press('Enter');
        await this.btnCustom.click();
        await this.fieldCustom.type('customTag2');
        await this.fieldCustom.press('Enter');
    }

    async chooseRandomTags() {

        let tagStrings: string[] = [];
        let tagLoc: Locator[] = await this.fillArrayWithTagBtns(tagStrings);

        for (let i = 0; i < tagLoc.length; i++) {
            await tagLoc[i].click();
        }

        return tagStrings;
    }

    private async fillArrayWithTagBtns(tagStrings: string[]) {
        let max = Math.floor(Math.random() * 19);
        let tagLoc: Locator[] = [];
        let randNum: number[] = [];

        for (let i = 0; i < max; i++) {
            let rand = Math.floor(Math.random() * 19);

            if (randNum.includes(rand))
                continue;

            randNum.push(rand);

            switch (rand) {
                case 0:
                    tagLoc.push(this.btnJobSeeking);
                    tagStrings.push(OnbPage.txtJobSeeking);
                    break;
                case 1:
                    tagLoc.push(this.btnHiring);
                    tagStrings.push(OnbPage.txtHiring);
                    break;
                case 2:
                    tagLoc.push(this.btnInvesting);
                    tagStrings.push(OnbPage.txtInvesting);
                    break;         
                case 3:
                    tagLoc.push(this.btnFundraising);
                    tagStrings.push(OnbPage.txtFundraising);
                    break;   
                case 4:
                    tagLoc.push(this.btnNetworking);
                    tagStrings.push(OnbPage.txtNetworking);
                    break;    
                case 5:
                    tagLoc.push(this.btnSelling);
                    tagStrings.push(OnbPage.txtSelling);
                    break;   
                case 6:
                    tagLoc.push(this.btnSaas);
                    tagStrings.push(OnbPage.txtSaas);
                    break; 
                case 7:
                    tagLoc.push(this.btnSeeking);
                    tagStrings.push(OnbPage.txtSeeking);
                    break; 
                case 8:
                    tagLoc.push(this.btnSeriesA);
                    tagStrings.push(OnbPage.txtSeriesA);
                    break; 
                case 9:
                    tagLoc.push(this.btnHealthcare);
                    tagStrings.push(OnbPage.txtHealthcare);
                    break; 
                case 10:
                    tagLoc.push(this.btnAI);
                    tagStrings.push(OnbPage.txtAi);
                    break; 
                case 11:
                    tagLoc.push(this.btnBiotech);
                    tagStrings.push(OnbPage.txtBiotech);
                    break; 
                case 12:
                    tagLoc.push(this.btnFounder);
                    tagStrings.push(OnbPage.txtFounder);
                    break; 
                case 13:
                    tagLoc.push(this.btnSeed);
                    tagStrings.push(OnbPage.txtSeed);
                    break; 
                case 14:
                    tagLoc.push(this.btnEdu);
                    tagStrings.push(OnbPage.txtEdu);
                    break; 
                case 15:
                    tagLoc.push(this.btnEnergy);
                    tagStrings.push(OnbPage.txtEnergy);
                    break; 
                case 16:
                    tagLoc.push(this.btnFinance);
                    tagStrings.push(OnbPage.txtFinance);
                    break; 
                case 17:
                    tagLoc.push(this.btnMarketing);
                    tagStrings.push(OnbPage.txtMarketing);
                    break; 
                case 18:
                    tagLoc.push(this.btnEngineering);
                    tagStrings.push(OnbPage.txtEngineering);
                    break; 
                case 19:
                    tagLoc.push(this.btnPM);
                    tagStrings.push(OnbPage.txtPm);
                    break; 
            }
        }

        return tagLoc;
    }
}