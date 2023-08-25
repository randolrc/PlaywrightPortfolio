import { test, expect, Page, Locator } from '@playwright/test';
import { Helper } from '../util/helper';
import { StaticPage } from './staticPage';

test('@smoke /homepage has expected content', async ({ page, headless, browserName, isMobile }) => {
  let url = '/';
  let homeTitle = 'twocents | The Opportunity Network for Business';
  let pageName = 'homepage';

  let staticPage = new StaticPage(page, url, pageName, homeTitle, headless, browserName);

  await staticPage.gotoAndVerify();

  await Helper.linkCheck(page, '/signup', page.getByRole('link', { name: 'Get Started' }).nth(1), browserName);
  await Helper.linkCheck(page, '/signup', page.getByRole('link', { name: 'Get Started' }).nth(2), browserName);
  await Helper.linkCheck(page, '/signup', page.getByRole('link', { name: 'Get Started' }).nth(3), browserName);

});

test('@smoke /about has expected content', async ({ page, headless, browserName, isMobile }) => {
  let url = '/about';
  let homeTitle = 'twocents | About the opportunity network';
  let pageName = 'about';

  let staticPage = new StaticPage(page, url, pageName, homeTitle, headless, browserName);

  await staticPage.gotoAndVerify();

  await expect(page.getByRole('link', { name: 'support@twocents.io' })).toBeVisible();
});

test('/privacy has expected content', async ({ page, headless, browserName, isMobile }) => {
  let url = '/privacy';
  let homeTitle = 'twocents | Our commitment to privacy';
  let pageName = 'privacy';

  let staticPage = new StaticPage(page, url, pageName, homeTitle, headless, browserName);

  await staticPage.gotoAndVerify();
});

test('/terms has expected content', async ({ page, headless, browserName, isMobile }) => {
  let url = '/terms';
  let homeTitle = 'twocents | Terms of Use';
  let pageName = 'terms';

  let staticPage = new StaticPage(page, url, pageName, homeTitle, headless, browserName);

  await staticPage.gotoAndVerify();
});

test('/disclosure has expected content', async ({ page, headless, browserName, isMobile }) => {
  let url = '/disclosure';
  let homeTitle = '';
  let pageName = 'disclosure';

  let staticPage = new StaticPage(page, url, pageName, homeTitle, headless, browserName);

  await staticPage.gotoAndVerify();
});

test('/faq-prospect has expected content', async ({ page, headless, browserName, isMobile }) => {
  let url = '/faq-prospect';
  let homeTitle = '';
  let pageName = 'faq-prospectDefault';

  let staticPage = new StaticPage(page, url, pageName, homeTitle, headless, browserName);

  await staticPage.gotoAndVerify();

  await page.getByRole('button', { name: 'Why did I just get an email from twocents?' }).click();
  await page.getByRole('button', { name: 'What is a low-key business network™?' }).click();
  await page.getByRole('button', { name: 'How is it private?' }).click();
  await page.getByRole('button', { name: 'Do you sell or share information about me?' }).click();
  await page.getByRole('button', { name: 'What information do you collect about me?' }).click();
  await page.getByRole('button', { name: 'Do you use third party cookies?' }).click();
  await page.getByRole('button', { name: 'What is twocents network and why would I use it?' }).click();

  await Helper.checkContent(page, '', headless, 'prospectExpanded', browserName);
});

test('@smoke invitation page, check content', async ({ page, browserName, baseURL, headless }) => {

  let url = '/invitation?token=b97d1759-47dd-437b-8fb3-ef01a731ed64';

  let staticPage = new StaticPage(page, url, 'Invite', 'twocents | a new, clean channel for business', headless, browserName);

  await staticPage.gotoAndVerify();

  await Helper.linkCheck(page, '/signup', page.getByRole('link', { name: 'Get Started' }).nth(1), browserName);

  await Helper.linkCheck(page, '/signup', page.getByRole('link', { name: 'Get Started' }).nth(2), browserName);

});
