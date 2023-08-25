import { test, expect, firefox, request, Page, Locator } from '@playwright/test';
import { Helper } from '../../util/helper';
import * as stoStrings from '../../util/storageStrings';  
import {PostModal} from './postModal';
import {OpptyPage} from './opptyPage';
import { ProfilePage } from '../Profile/profilePage';

let postModal: PostModal;
let opptyPage: OpptyPage;

test.use({ storageState: stoStrings.TWOCENTS_LOGIN });

test('@smoke view profile, reply to post, share post, view all messages, archive post', async ({ page, headless, isMobile, browserName, browser, baseURL }) => {
    
    const posterContext = await browser.newContext({ storageState: stoStrings.TWOCENTS_LOGIN_VIEW });
    const posterPage = await posterContext.newPage();

    let opptyPagePoster = new OpptyPage(posterPage);
    let optyPageReceiver = new OpptyPage(page);

    let randHex = Helper.genRandHex(6);

    await opptyPagePoster.goto();

    await opptyPagePoster.APINewTestPost(`Reply to this test post and then delete it, please ${randHex}`);

    await optyPageReceiver.setPostLocators(randHex);

    await optyPageReceiver.goto();
    await optyPageReceiver.postBtnNewReply.click({timeout: 30 * 1000});

    await optyPageReceiver.postFieldReply.click();
    await optyPageReceiver.postFieldReply.type(`Here is the reply to ${randHex}`);
    await optyPageReceiver.postBtnSendReply.click();
    await optyPageReceiver.msgPostReplied.click();

    await posterPage.reload({waitUntil: 'networkidle'});
    await expect(posterPage.getByText(`Here is the reply to ${randHex}`)).toBeVisible({timeout: 60 * 1000});

    await optyPageReceiver.btnArchive.click();
    await expect(optyPageReceiver.msgPostArchive).toBeVisible();
    await expect(optyPageReceiver.postLoc).toBeHidden();
    
    await opptyPagePoster.deletePost();
    await expect(opptyPagePoster.APIPostMsg).toBeHidden();

    await posterPage.close();
    await posterContext.close();
    
});

test('@smoke new activity button that refreshes opportunity page', async ({ page, headless, isMobile, browserName, browser, baseURL }) => {
    const posterContext = await browser.newContext({ storageState: stoStrings.TWOCENTS_LOGIN_VIEW });
    const posterPage = await posterContext.newPage();

    let opptyPagePoster = new OpptyPage(posterPage);
    let optyPageReceiver = new OpptyPage(page);

    let randHex1 = Helper.genRandHex(6);
    let randHex2 = Helper.genRandHex(6);
    let postText1 = `This is a test post to test the new activity toast notification and refresh link. ${randHex1}`;
    let postText2 = `This is a test post to test the new activity toast notification and refresh link. ${randHex2}`;

    await optyPageReceiver.goto();
    await opptyPagePoster.goto();

    await opptyPagePoster.APINewTestPost(postText1);
    await opptyPagePoster.APINewTestPost(postText2);

    await page.getByRole('button', { name: 'New activity (2)' }).click();
    await expect(page.getByText(postText1)).toBeVisible();
    await expect(page.getByText(postText2)).toBeVisible();

    await posterPage.reload();
    await opptyPagePoster.deletePost();
    await opptyPagePoster.deletePost();

    await posterPage.close();
    await posterContext.close();
});


