import { test, expect, Page, Locator, APIRequestContext } from '@playwright/test';
import * as stoStrings from '../util/storageStrings';

test.use({ storageState: stoStrings.TWOCENTS_LOGIN_ONB });
test('POST - web /api/profile - rejecting long strings', async ({ request }) => {

    let json = require('./JsonPayloads/profileLongstrings.json');
    
    json.color.id = process.env.colorId1 as string;
    
    let resp = await request.post('api/profile', {data: json});

    expect(resp.ok()).toBeFalsy();
});