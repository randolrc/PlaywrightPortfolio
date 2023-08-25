import { test, expect, Page, Locator } from '@playwright/test';
import { Helper } from '../util/helper';

export class StaticPage {
    page: Page;
    url: string;
    pageName: string;
    pageTitle: string;
    headless: boolean | undefined;
    browserName: string;

    constructor(page: Page, url: string, pageName: string, pageTitle: string, headless: boolean | undefined, browserName: string) {
        this.page = page;
        this.url = url;
        this.pageName = pageName;
        this.pageTitle = pageTitle;
        this.headless = headless;
        this.browserName = browserName;
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async gotoAndVerify() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('networkidle');

        await Helper.scrollPageDown(this.page);
      
        await Helper.checkContent(this.page, this.pageTitle, this.headless, this.pageName, this.browserName);

        await Helper.checkHeaderLinks(this.page, this.browserName);
        await Helper.checkFooterLinks(this.page, this.browserName); 
    }
}