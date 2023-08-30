import {  Page, Locator, expect } from '@playwright/test';

export class OpptyPage {
    page: Page;

    cardCarterPost: Locator;
    idCarterPost: string;
    btnCarterFav: Locator;
    btnCarterShare: Locator;
    btnCarterReply: Locator;
    btnCarterProfile: Locator;

    btnStartAPost: Locator;
    btnStarAPostFindWork: Locator;
    btnStartAPostHiring: Locator;
    btnStartAPostCustomers: Locator;
    btnStartAPostFundraise: Locator;
    btnStartAPostNetworking: Locator;

    btnShare: Locator;

    btnLeftNav: Locator;

    btnArchive: Locator;
    btnPostOptionDropdown: Locator;

    btnDrpdwnCancelPost: Locator;
    btnDrpdwnPausePost: Locator;
    btnDrpdwnUnpausePost: Locator;

    btnAllMessages: Locator;
    btnAllOpptys: Locator;

    btnModalCancelPost: Locator;

    msgPostPaused: Locator;
    msgPostUnpaused: Locator;
    msgPostStarred1: Locator;
    msgPostStarred2: Locator;
    msgPostUnstarred: Locator;
    msgPostArchive: Locator;
    msgPostCanceled: Locator;
    msgPostReplied: Locator;

    postLoc: Locator;
    postBtnNewReply: Locator;
    postFieldReply: Locator;
    postBtnSendReply: Locator;

    btnShareModalEmail: Locator;
    btnShareModalLinkedIn: Locator;
    btnShareModalTwitter: Locator;
    btnShareModalCopy: Locator;

    APIPostMsg: Locator;

    rawPost: string;

    constructor(page: Page) {
        this.page = page;
        this.rawPost = '{"content":"This is a test post, will be deleted.","keywords":["Test post"],"location":"REMOTE","geolocation":{"latitude":null,"longitude":null}}';

        this.btnPostOptionDropdown = page.locator('.dropDownBtn > .MuiSvgIcon-root > path').first();

        this.btnDrpdwnCancelPost = page.getByText('Cancel post');
        this.btnDrpdwnPausePost = page.getByText('Pause post');
        this.btnDrpdwnUnpausePost = page.getByText('Unpause post');
        
        this.btnModalCancelPost = page.getByRole('button', { name: 'Cancel Post' });
        
        this.msgPostPaused = page.getByText('Post has been paused');
        this.msgPostUnpaused = page.getByText('Post has been unpaused');
        this.msgPostStarred1 = page.getByText('Opportunity has been starred.');
        this.msgPostStarred2 = page.getByText('We will prioritize similar opportunities for you in the future!');
        this.msgPostUnstarred = page.getByText('Opportunity has been un-starred.');
        this.msgPostArchive = page.getByText('Opportunity has been archived');
        this.msgPostCanceled = page.getByText('Post has been canceled');
        this.msgPostReplied = page.getByText('Reply has been sent');

        this.idCarterPost = process.env.CARTER_POST_ID as string;
        this.cardCarterPost = page.locator(`[id="${this.idCarterPost}"]`);
        this.btnCarterFav = this.cardCarterPost.locator('.middle > .actionBtn.withSpacing').first();
        this.btnCarterShare = this.cardCarterPost.getByText('Share');
        this.btnCarterReply = this.cardCarterPost.getByText('Message').nth(1);
        this.btnCarterProfile = this.cardCarterPost.locator('img.preview-image').first();

        this.btnLeftNav = page.getByRole('link', { name: 'opportunities-inactive.svg Opportunities' })

        this.btnStartAPost = page.getByRole('button', { name: 'Start a post' });
        this.btnStarAPostFindWork = page.getByRole('button', { name: 'Find work icon Find work' });
        this.btnStartAPostHiring = page.getByRole('button', { name: 'Hire icon Hire' });
        this.btnStartAPostCustomers = page.getByRole('button', { name: 'Find customers icon Find customers' });
        this.btnStartAPostFundraise = page.getByRole('button', { name: 'Fundraise icon Fundraise' });
        this.btnStartAPostNetworking = page.getByRole('button', { name: 'Ask advice icon Ask advice' });

        this.btnShare = page.locator('.shareBtn').first();

        this.btnShareModalEmail = page.getByTestId('EmailIcon');
        this.btnShareModalLinkedIn = page.getByTestId('LinkedInIcon');
        this.btnShareModalTwitter = page.getByTestId('TwitterIcon');
        this.btnShareModalCopy = page.getByText('Copy');

        this.btnAllMessages = page.getByRole('button', { name: 'All messages' }).first();
        this.btnAllOpptys = page.getByRole('button', { name: 'All Opportunities' });
    }

    async goto() {
        await this.page.goto("/opportunities");
        await this.page.waitForLoadState("networkidle"); 
    }

    async showOnlyMyPosts() {
        await this.showSinglePost('nope');
    }

    async showSinglePost(id: string) {
        const routePromise = this.page.route(`https://staging.twocents.io/api/opportunities`, async (route, request) => {

            const response = await route.fetch();
            let body = await response.text();
            let json = await JSON.parse(body);

            let post;
            for (let i = 0; i < json.opportunities[0].opportunities.length; i++) {
                let foo = json.opportunities[0].opportunities[i];

                if (foo.id === id) {
                    post = foo;
                }
            }

            json.opportunities[0].opportunities = [];

            if (typeof post !== 'undefined')
                json.opportunities[0].opportunities[0] = post;

            body = JSON.stringify(json);

            await route.fulfill({
                body
            });

        });
    }

    async setPostLocators(postIdent: string) {
        this.postLoc = this.page.locator('.messagesHolder > div').filter({hasText: postIdent});
        this.postBtnNewReply = this.postLoc.locator('.middle > .replyBtn');
        this.postFieldReply = this.postLoc.locator('.textEditor');
        this.postBtnSendReply = this.postLoc.locator('.actions > .replyBtn');
        this.btnArchive = this.postLoc.locator('.actionBtn.withSpacing.hideOnMobile');
    }

    async APINewTestPost(postContent: string) {

        let jsonPost = JSON.parse(this.rawPost);
        jsonPost.content = postContent;
        this.APIPostMsg = this.page.getByText(postContent);

        const resp = await this.page.request.post('/api/post/create', {data: jsonPost, timeout: 60 * 1000});
        return resp;
    }

    async deletePost() {
        await this.btnPostOptionDropdown.click();
        await this.btnDrpdwnCancelPost.click();
        await this.btnModalCancelPost.click();
        await expect(this.msgPostCanceled).toBeVisible();
        await this.page.waitForLoadState("networkidle"); 
    }
}