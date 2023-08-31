import { test, expect, firefox, request, Page, Locator } from '@playwright/test';
import { Helper } from '@util/helper';
import * as stoStrings from '@util/storageStrings';  
import {OpptyPage} from '@pages/opptyPage';

test.use({ storageState: stoStrings.TWOCENTS_LOGIN });

test('@smoke view profile, reply to post, share post, view all messages, archive post', async ({ page, browser }) => {
    
    const posterContext = await browser.newContext({ storageState: stoStrings.TWOCENTS_LOGIN_VIEW });
    const posterPage = await posterContext.newPage();

    let opptyPagePoster = new OpptyPage(posterPage);
    let optyPageReceiver = new OpptyPage(page);

    let randHex = Helper.genRandHex(6);

    await opptyPagePoster.goto();

    let resp = await opptyPagePoster.APINewTestPost(`Reply to this test post and then delete it, please ${randHex}`);
    let json = await Helper.getJsonFromResp(resp);
    
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
    
    await opptyPagePoster.deletePostWithAPI(json.id);

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
    let postStart = 'This is a test post to test the new activity toast notification and refresh link.';
    let postText1 = `${postStart} ${randHex1}`;
    let postText2 = `${postStart} ${randHex2}`;

    await optyPageReceiver.goto();
    await opptyPagePoster.goto();

    let resp1 = await opptyPagePoster.APINewTestPost(postText1);
    let resp2 = await opptyPagePoster.APINewTestPost(postText2);

    let json1 = await Helper.getJsonFromResp(resp1);
    let json2 = await Helper.getJsonFromResp(resp2);

    await page.getByRole('button', { name: 'New activity (2)' }).click();
    await expect(page.getByText(postText1)).toBeVisible();
    await expect(page.getByText(postText2)).toBeVisible();

    await posterPage.reload();
    await opptyPagePoster.deletePostWithAPI(json1.id);
    await opptyPagePoster.deletePostWithAPI(json2.id);

    await posterPage.close();
    await posterContext.close();
});


