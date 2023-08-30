import { test, expect, APIRequestContext } from '@playwright/test';
import * as stoStrings from '@util/storageStrings';
import { Helper } from '@util/helper';

    //these should probably be in a separate project, unless there's some trick to have them run exactly once per run 
    //regardless of the number of browsers set in config

test('@smoke API basic response tests', async ({ request, browser }) => {
    
    //non-publicly available/visible APIs
    let baseUrl = process.env.BASE_API_URL as string;

    await getWithBearerTk(baseUrl + process.env.endPtGet1, request);
    await postWithBearerTk(baseUrl + process.env.endPtPost1, request);

    //publicly visible web APIs
    let endPtArr = Helper.getArrayFromTxtFile(__dirname + '/webEndpoints.txt')

    const posterContext = await browser.newContext({ storageState: stoStrings.TWOCENTS_LOGIN_ONB });
    
    for (const endpt of endPtArr) {
        await getWithUserAuthTk(posterContext.request, endpt);
    }

});

async function getWithUserAuthTk(request: APIRequestContext, endpoint: string, ) {
    
    let resp = await request.get(endpoint);

    expect(resp.ok()).toBeTruthy();
}

async function getWithBearerTk(url: string, request: APIRequestContext, badBearerToken: string = "foo", 
    validBearerToken: string | undefined = process.env.API_BEARER) {

    let resp = await request.get(url, {
      headers: {
          "Authorization": 'Bearer ' + badBearerToken}
      });

    expect(resp.status()).toBe(401);
    expect((await resp.body()).byteLength).toBe(0);

    resp = await request.get(url, {
        headers: {
            "Authorization": 'Bearer ' + validBearerToken}
        });
        
    expect(resp.ok()).toBeTruthy();
    expect((await resp.body()).byteLength).toBeGreaterThan(0);
    
}

async function putWithBearerTk(url: string, request: APIRequestContext, badBearerToken: string = "foo") {

    const resp = await request.put(url, {
      headers: {
          "Authorization": 'Bearer ' + badBearerToken}
      });

    expect(resp.status()).toBe(401);
    expect((await resp.body()).byteLength).toBe(0);
    
}

async function postWithBearerTk(url: string, request: APIRequestContext, badBearerToken: string = "foo") {

    const resp = await request.post(url, {
      headers: {
          "Authorization": 'Bearer ' + badBearerToken}
      });

    expect(resp.status()).toBe(401);
    expect((await resp.body()).byteLength).toBe(0);
}

