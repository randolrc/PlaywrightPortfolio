import { TestInfo, Page, Locator, expect, BrowserContext, Request  } from '@playwright/test';

export class Helper {

  static getLeftNavMask(page: Page) {
    return [page.getByRole('navigation')];
  }

  static async scrollPageDown(page: Page) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  static async scrollPageUp(page: Page) {
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  static async scrollPageDownUp(page: Page) {
    await Helper.scrollPageDown(page);
    await page.waitForTimeout(1000);
    await Helper.scrollPageUp(page);
  }

  static async checkContent(page: Page, title: string, headless: boolean | undefined, scrnFilename: string, 
    browserName: string, masks: Locator[] = [], fullPage: boolean = true) {
    
    await expect(page).toHaveTitle(title);
  
    if (headless && browserName === 'firefox') {
      await expect.soft(page).toHaveScreenshot(scrnFilename + '.png', { fullPage: fullPage, mask: masks });
      await page.evaluate(() => window.scrollTo(0, 0));
    }
  }

  static async checkContentTarget(target: Locator, headless: boolean | undefined, scrnFilename: string, 
    browserName: string, masks: Locator[] = []) {

    if (headless && browserName === 'firefox') {
      await expect.soft(target).toHaveScreenshot(scrnFilename + '.png', { mask: masks });
    }
  }

  static genRandHex(size: number) {
    return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  }

  static getArrayFromTxtFile(filePath: string) {
    const fs = require("fs");
    return fs.readFileSync(filePath).toString('UTF8').split('\n');
  }

  static async getJsonFromReq(req: Request) {
    let resp = await req.response();
    let body = await resp?.text() as string;
    let json = await JSON.parse(body);

    return json;
  }

  static loadEmailHex(browserName: string, type: string) {
    const fs = require('fs');
      
    let b = fs.readFileSync("emails.json");
    let json = JSON.parse(b.toString());
  
    let emailHex = json[type].chromium;
  
    switch (browserName) {
        case "firefox":
            emailHex = json[type].firefox;
            break;
        case "webkit":
            emailHex = json[type].webkit;
            break;
    }
  
    return emailHex;
  }

  static async loginWithMSFT (page: Page, browserName: String, url: string, msftAccount: string, scrollPage: boolean = false) {
    await page.goto(url, { waitUntil: 'networkidle' });

    if (scrollPage) {
      await Helper.scrollPageDown(page);
      await page.waitForTimeout(1000);
    }

    const page1Promise = page.waitForEvent('popup');
    await page.locator('path[fill="#f25022"]').click();
    const page1 = await page1Promise;

    if (browserName === 'webkit') {
      await page1.getByText('Email, phone, or Skype').click();
      await page1.getByRole('textbox', { name: 'Enter your email, phone, or Skype.' }).fill(msftAccount);
      await page1.getByRole('button', { name: 'Next' }).click();
    } else {
      await page1.getByText(msftAccount).click();
    }

    await page.getByRole('button', { name: 'See my Opportunities' }).click();

    await page.waitForLoadState("networkidle", {timeout: 30000});
    await expect(page.getByText(msftAccount)).toBeVisible();
  }


  static async loginWithGoogle (page: Page, browserName: String, url: string, gmailAccount: string, scrollPage: boolean = false, fullName: string, firstName: string,
      onboarding: boolean = false) {
  
    //always override default waitUntil, set to networkidle, otherwise things run too fast in headless
    await page.goto(url, { waitUntil: 'networkidle' });

    if (scrollPage) {
      await Helper.scrollPageDown(page);
      await page.waitForTimeout(1000);
    }

    await page.waitForTimeout((Math.random() * 5 * 1000) + 1000);
    
    const popupPromise = page.waitForEvent('popup', {timeout: 30 * 1000});
  
    if (browserName === 'chromium')
        await page.locator('iframe[title="Sign in with Google Button"]').click();
    else if (browserName === 'firefox' || browserName === 'webkit')
        await page.locator('iframe[title="Sign in with Google Button"] + div').click();

    await page.waitForTimeout((Math.random() * 5 * 1000) + 1000);
    
    const pagePopup = await popupPromise;
    await pagePopup.getByRole('link', { name: `Google Account, ${fullName}\'s profile picture, ${gmailAccount}@gmail.com, ${fullName}` }).click();
  
    if (!pagePopup.isClosed()) {
      const loc = pagePopup.getByRole('heading', { name: `Confirm you want to sign in to twocents.io as ${firstName}` });
    
      if (await loc.isVisible())  {
        await page.waitForTimeout((Math.random() * 5 * 1000) + 1000);
          await pagePopup.getByRole('button', { name: 'Confirm' }).click();
      }
    }

    if (!onboarding)
      await page.getByRole('button', { name: 'See my Opportunities' }).click();

    await page.waitForLoadState("networkidle", {timeout: 30000});
  }

  static async logout(page: Page) {
    await page.getByTestId('ArrowDropDownIcon').click();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();
    await page.waitForLoadState("networkidle", {timeout: 30000});

    await page.locator('iframe[title="Sign in with Google Button"]').waitFor();
  }

  static async checkHeaderLinks(page: Page, browserName: string) {
    await Helper.linkCheck(page, '/', page.getByRole('img', { name: '2cents logo' }).first(), browserName);
    await Helper.linkCheck(page, '/about', page.getByRole('link', { name: 'About' }).first(), browserName);
    await Helper.linkCheck(page, '/login', page.getByRole('link', { name: 'Sign In' }).first(), browserName);
    await Helper.linkCheck(page, '/signup', page.getByRole('link', { name: 'Get Started' }).first(), browserName);
  }
  
  static async checkFooterLinks(page: Page, browserName: string) {
    await Helper.linkCheck(page, '/', page.getByRole('contentinfo').getByRole('img', { name: '2cents logo' }), browserName, true);
    await Helper.linkCheck(page, '/about', page.getByRole('contentinfo').getByRole('link', { name: 'About' }), browserName, true);
    
    await Helper.linkCheck(page, '/privacy', page.getByRole('link', { name: 'Privacy', exact: true }), browserName, true);
    await Helper.linkCheck(page, '/terms', page.getByText('Terms of Service'), browserName, true);
    await Helper.linkCheck(page, '/disclosure', page.locator('a').filter({ hasText: 'Disclosure' }), browserName, true);
    await Helper.linkCheck(page, '/login', page.getByRole('link', { name: 'Sign In' }).last(), browserName, true);
    await Helper.linkCheck(page, '/signup', page.getByRole('link', { name: 'Get Started' }).last(), browserName, true);
    
  }
  
  static async linkCheck(page: Page, nextUrl: string, locator: Locator, browserName: string, scrollPage: boolean = false) {
  
    //some browsers have trouble clicking links at bottom if you don't explicitly scroll (makes everything render?)
    if (scrollPage) {
       await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
  
    const origUrl = page.url();
  
    await page.waitForTimeout(1000);
    await locator.click();
    await page.waitForLoadState("networkidle", {timeout: 30 * 1000});
    await expect(page).toHaveURL(nextUrl);
  
    if (origUrl !== page.url())
    {
      await page.goBack();
      await page.waitForLoadState("networkidle", {timeout: 30 * 1000});
    }
    
    await page.waitForTimeout(500);

    await expect(page).toHaveURL(origUrl);
    await page.waitForLoadState("networkidle", {timeout: 30 * 1000});
  }

  static async refreshGoogleTokens(page: Page, username: string, pwd: string, fileNamePathLogin: string) {
    await page.goto("https://accounts.google.com/signin/v2/identifier?hl=en&flowName=GlifWebSignIn&flowEntry=ServiceLogin");
    
    await page.waitForTimeout((Math.random() * 9854) + 1000);
    await page.waitForSelector('input[type="email"]');
    await page.waitForTimeout((Math.random() * 6983) + 1000);
    await page.fill('input[type="email"]', username);
    await page.waitForTimeout((Math.random() * 4852) + 1000);
    await page.click("#identifierNext");
    await page.waitForTimeout((Math.random() * 3985) + 1000);
    await page.waitForSelector('input[type="password"]');
    await page.fill('input[type="password"]', pwd);
    await page.waitForTimeout((Math.random() * 4365) + 1000);
    await page.waitForSelector("#passwordNext");
    await page.click("#passwordNext");

    await page.waitForURL(/myaccount.google.com/);
    await page.waitForTimeout((Math.random() * 7896) + 1000);

    await page.context().storageState({ path: fileNamePathLogin });
  }

  static async refreshMSFTokens(page: Page, username: string, fileNamePathLogin: string) {
    await page.goto('https://outlook.live.com/owa/');
    await page.waitForLoadState("networkidle", {timeout: 30000});
    await page.waitForTimeout((Math.random() * 5 * 1000) + 1000);

    await page.getByRole('navigation', { name: 'Quick links' }).getByRole('link', { name: 'Sign in' }).click();
    await page.waitForTimeout((Math.random() * 5 * 1000) + 1000);
    await page.getByRole('textbox', { name: 'Enter your email, phone, or Skype.' }).fill(username);
    await page.waitForTimeout((Math.random() * 5 * 1000) + 1000);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout((Math.random() * 5 * 1000) + 1000);
    await page.getByPlaceholder('Password').fill('T.1fighter');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForTimeout((Math.random() * 5 * 1000) + 1000);
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForURL('https://outlook.live.com/mail/0/');
    await page.waitForLoadState("networkidle", {timeout: 30000});

    await page.waitForTimeout((Math.random() * 5 * 1000) + 1000);

    await page.context().storageState({ path: fileNamePathLogin });
  }

  static async refreshLoginTokens(page: Page, username: string, fullName: string, firstName: string, fileNamePathLogin: string, browserName: string) {
   
    await Helper.loginWithGoogle(page, browserName, '/login', username, false, fullName, firstName);

    await page.getByRole('navigation').getByText('Inbox').waitFor();
    await page.waitForLoadState("networkidle", {timeout: 30000});

    await page.context().storageState({ path: fileNamePathLogin });
  }
}
