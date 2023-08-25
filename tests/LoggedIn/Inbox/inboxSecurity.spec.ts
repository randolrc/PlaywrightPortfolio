import { test, expect, firefox, request } from '@playwright/test';
import { Helper } from '../../util/helper';
import * as stoStrings from '../../util/storageStrings';

test.use({ storageState: stoStrings.EMAIL_LOGIN });

test('404 results in requesting actions for non-owned threads', async ({ page, browserName, request }) => {
    
    let foundThreadToAlter = false;
    const nonOwnedThreadID = process.env.SAMPLE_THREAD_ID as string;
    let msgType = 'transactional';

    let resp = await request.get(`https://staging.twocents.io/api/thread/${msgType}?page=0&limit=1`);
    let jsonObj = await resp.json();
    const ownedThreadID = await jsonObj[0].threadId;
    console.log(ownedThreadID);

    page.on('response', async response => {
        if (response.url().includes(nonOwnedThreadID)) {
            expect(response.status()).toBe(404);
            
            foundThreadToAlter = true;
        }
    });

    const routePromise = page.route(`https://staging.twocents.io/api/thread/call/${ownedThreadID}?call=actions`, async (route, request) => {
        console.log('helloworld');
        await route.continue({url: `https://staging.twocents.io/api/thread/call/${nonOwnedThreadID}?call=actions`});
    });

    await page.goto('/inbox');
    await page.waitForLoadState("networkidle", {timeout: 30000});
    await routePromise;

    expect(foundThreadToAlter).toBe(true);

});


test('override user role, try going to /admin', async ({ page, browserName }) => {

    await page.route("https://staging.twocents.io/api/auth/callback/google", async (route, request) => {

        const response = await route.fetch();
        
        let body = await response.text();

        body = body.replace('"role":"USER"', '"role":"ADMIN"');

        await route.fulfill({
            body
        })
    });

    await Helper.loginWithGoogle(page, browserName, '/login', process.env.GMAIL_USERNAME as string, false, 'Gordon Freeman', 'Gordon')

    await page.goto('/inbox');
    await page.waitForLoadState("networkidle", {timeout: 30000});

    expect(await page.getByRole('link', { name: 'admin-inactive.svg Admin' }).count()).toBe(0);

    await page.goto("/admin");

    await expect(page).toHaveURL('/opportunities');

});