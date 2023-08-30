import { test, expect, Page, Locator, APIRequestContext } from '@playwright/test';
import { Helper } from '../../util/helper';

export class OnbPage {

    page: Page;

    btnSkip: Locator;
    btnLetsGo: Locator;
    btnBack: Locator;
    btnNext: Locator;
    btnDone: Locator;

    txtJobSeeking: string;
    txtHiring: string;
    txtInvesting: string;
    txtFundraising: string;
    txtNetworking: string;
    txtSelling: string;
    txtSaas: string;
    txtSeeking: string;
    txtSeriesA: string;
    txtHealthcare: string;
    txtAi: string;
    txtBiotech: string;
    txtFounder: string;
    txtSeed: string;
    txtEdu: string;
    txtEnergy: string;
    txtFinance: string;
    txtMarketing: string;
    txtEngineering: string;
    txtPm: string;

    btnJobSeeking: Locator;
    btnHiring: Locator;
    btnInvesting: Locator;
    btnFundraising: Locator;
    btnNetworking: Locator;
    btnSelling: Locator;
    btnSaas: Locator;
    btnSeeking: Locator;
    btnSeriesA: Locator;
    btnHealthcare: Locator;
    btnAI: Locator;
    btnBiotech: Locator;
    btnFounder: Locator;
    btnSeed: Locator;
    btnEdu: Locator;
    btnEnergy: Locator;
    btnFinance: Locator;
    btnMarketing: Locator;
    btnEngineering: Locator;
    btnPM: Locator;
    btnCustom: Locator;

    dropdownLFW: Locator;
    selectionLFWYes: Locator;
    selectionLFWNo: Locator;

    dropdownExp: Locator;
    selectionExpInt: Locator;
    selectionExpEntry: Locator;
    selectionExpExp: Locator;

    fieldCustom: Locator;
    fieldDetails: Locator;
    fieldJobTitle: Locator;
    fieldCompany: Locator;

    constructor(page: Page) {
        this.page = page;

        this.btnSkip = page.getByRole('button', { name: 'Skip' });
        this.btnLetsGo = page.getByRole('button', { name: 'Let\'s go' });
        this.btnBack = page.getByRole('button', { name: 'Back' });
        this.btnNext = page.getByRole('button', { name: 'Next' });
        this.btnDone = page.getByRole('button', { name: 'Done' });

        this.txtJobSeeking = 'Job Seeking';
        this.txtHiring = 'Hiring';
        this.txtInvesting = 'Investing';
        this.txtFundraising = 'Fundraising';
        this.txtNetworking = 'Networking';
        this.txtSelling = 'Selling Services';
        this.txtSaas = 'SaaS';
        this.txtSeeking = 'Seeking Services';
        this.txtSeriesA = 'Series A';
        this.txtHealthcare = 'Healthcare';
        this.txtAi = 'AI';
        this.txtBiotech = 'Biotech';
        this.txtFounder = 'Founder';
        this.txtSeed = 'Seed Stage';
        this.txtEdu = 'Education';
        this.txtEnergy = 'Energy';
        this.txtFinance = 'Finance';
        this.txtMarketing = 'Marketing';
        this.txtEngineering = 'Engineering';
        this.txtPm = 'Product Management';

        this.btnJobSeeking = page.getByRole('button', { name: this.txtJobSeeking });
        this.btnHiring = page.getByRole('button', { name: this.txtHiring });
        this.btnInvesting = page.getByRole('button', { name: this.txtInvesting });
        this.btnFundraising = page.getByRole('button', { name: this.txtFundraising });
        this.btnNetworking = page.getByRole('button', { name: this.txtNetworking });
        this.btnSelling = page.getByRole('button', { name: this.txtSelling });
        this.btnSaas = page.getByRole('button', { name: this.txtSaas });
        this.btnSeeking = page.getByRole('button', { name: this.txtSeeking });
        this.btnSeriesA = page.getByRole('button', { name: this.txtSeriesA  });
        this.btnHealthcare = page.getByRole('button', { name: this.txtHealthcare });
        this.btnAI = page.getByRole('button', { name: this.txtAi, exact: true });
        this.btnBiotech = page.getByRole('button', { name: this.txtBiotech });
        this.btnFounder = page.getByRole('button', { name: this.txtFounder });
        this.btnSeed = page.getByRole('button', { name: this.txtSeed });
        this.btnEdu = page.getByRole('button', { name: this.txtEdu });
        this.btnEnergy = page.getByRole('button', { name: this.txtEnergy });
        this.btnFinance = page.getByRole('button', { name: this.txtFinance });
        this.btnMarketing = page.getByRole('button', { name: this.txtMarketing });
        this.btnEngineering = page.getByRole('button', { name: this.txtEngineering });
        this.btnPM = page.getByRole('button', { name: this.txtPm });
        this.btnCustom = page.getByRole('button', { name: 'Custom', exact: true });

        this.dropdownLFW = page.locator('div[id="job-seeking"]');
        this.selectionLFWYes = page.getByRole('option', { name: 'Yes, I am looking for a job' });
        this.selectionLFWNo = page.getByRole('option', { name: 'No, not job seeking right now' });

        this.dropdownExp = page.locator('div[id="experience"]');
        this.selectionExpInt = page.getByRole('option', { name: 'Internship' });
        this.selectionExpEntry = page.getByRole('option', { name: 'Entry Level' });
        this.selectionExpExp = page.getByRole('option', { name: 'Experienced' });

        this.fieldCustom = page.getByRole('textbox');
        this.fieldDetails = page.getByPlaceholder('This info will appear on your twocents profile to help others get to know you');
        this.fieldJobTitle = page.getByPlaceholder('Your job title');
        this.fieldCompany = page.getByPlaceholder('Company');

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
                    tagStrings.push(this.txtJobSeeking);
                    break;
                case 1:
                    tagLoc.push(this.btnHiring);
                    tagStrings.push(this.txtHiring);
                    break;
                case 2:
                    tagLoc.push(this.btnInvesting);
                    tagStrings.push(this.txtInvesting);
                    break;         
                case 3:
                    tagLoc.push(this.btnFundraising);
                    tagStrings.push(this.txtFundraising);
                    break;   
                case 4:
                    tagLoc.push(this.btnNetworking);
                    tagStrings.push(this.txtNetworking);
                    break;    
                case 5:
                    tagLoc.push(this.btnSelling);
                    tagStrings.push(this.txtSelling);
                    break;   
                case 6:
                    tagLoc.push(this.btnSaas);
                    tagStrings.push(this.txtSaas);
                    break; 
                case 7:
                    tagLoc.push(this.btnSeeking);
                    tagStrings.push(this.txtSeeking);
                    break; 
                case 8:
                    tagLoc.push(this.btnSeriesA);
                    tagStrings.push(this.txtSeriesA);
                    break; 
                case 9:
                    tagLoc.push(this.btnHealthcare);
                    tagStrings.push(this.txtHealthcare);
                    break; 
                case 10:
                    tagLoc.push(this.btnAI);
                    tagStrings.push(this.txtAi);
                    break; 
                case 11:
                    tagLoc.push(this.btnBiotech);
                    tagStrings.push(this.txtBiotech);
                    break; 
                case 12:
                    tagLoc.push(this.btnFounder);
                    tagStrings.push(this.txtFounder);
                    break; 
                case 13:
                    tagLoc.push(this.btnSeed);
                    tagStrings.push(this.txtSeed);
                    break; 
                case 14:
                    tagLoc.push(this.btnEdu);
                    tagStrings.push(this.txtEdu);
                    break; 
                case 15:
                    tagLoc.push(this.btnEnergy);
                    tagStrings.push(this.txtEnergy);
                    break; 
                case 16:
                    tagLoc.push(this.btnFinance);
                    tagStrings.push(this.txtFinance);
                    break; 
                case 17:
                    tagLoc.push(this.btnMarketing);
                    tagStrings.push(this.txtMarketing);
                    break; 
                case 18:
                    tagLoc.push(this.btnEngineering);
                    tagStrings.push(this.txtEngineering);
                    break; 
                case 19:
                    tagLoc.push(this.btnPM);
                    tagStrings.push(this.txtPm);
                    break; 
            }
        }

        return tagLoc;
    }
}