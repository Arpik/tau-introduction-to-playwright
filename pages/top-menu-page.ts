import { StitchMode } from '@applitools/eyes-playwright';
import { expect, Locator, Page } from '@playwright/test';
import exp from 'constants';
import { get } from 'http';

export class TopMenuPage {
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly docsLink: Locator;
    readonly apiLink: Locator;
    readonly communityLink: Locator;
    readonly nodeLink: Locator;
    readonly pythonLink: Locator;
    readonly javaLink: Locator;
    readonly dotnetLink: Locator;
    readonly nodejsLink: Locator;
    readonly npmLink: Locator;
    readonly appJavaLink: Locator;
    readonly msTestLink: Locator

    readonly pyPILink: Locator;
    
    readonly docsLabel: Locator;
    readonly apiLabel: Locator;
    readonly nodeLabel: Locator;
    readonly communityLabel: Locator;

    readonly nodejsLabel: Locator;
    readonly pythonLabel: Locator;
    readonly javaLabel: Locator;
    readonly dotnetLabel: Locator;

    // Distinct variables for each page
    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.docsLink = page.getByRole('button', {name: 'Docs'})
        this.apiLink = page.getByRole('button', {name: 'API'})
        this.communityLink = page.getByRole('button', {name: 'Community'})
        this.nodeLink = page.getByRole('button', {name: 'Node.js'});

        this.pythonLink = page.locator('a.dropdown__link[href="/python/docs/intro"]');
        this.javaLink = page.locator('a.dropdown__link[href="/java/docs/intro"]');  
        this.dotnetLink = page.locator('a.dropdown__link[href="/dotnet/docs/intro"]');
        
        // For Dropdown Element Pages
        this.pyPILink = page.locator('li:has-text("PyPI")');
        this.npmLink = page.locator('li[role="tab"][aria-selected="true"].tabs__item.tabItem_LNqP.tabs__item--active:has-text("npm")').nth(0);
        this.appJavaLink = page.locator('li[role="tab"][aria-selected="true"].tabs__item.tabItem_LNqP.tabs__item--active:has-text("App.java")').nth(0);        
        this.msTestLink = page.locator('li[role="tab"][aria-selected="true"].tabs__item.tabItem_LNqP.tabs__item--active:has-text("MSTest")').nth(0)
    }

    async hoverNode() {
        await this.nodeLink.hover();
    }

    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }

    async assertPyPIVisible() {
        await expect(this.pyPILink).toBeVisible();
    }

    async assertNpmVisible() {
        await expect(this.npmLink).toBeVisible()
    }

    async assertAppJavaVisible() {
        await expect(this.appJavaLink).toBeVisible()
    }

    async assertMSTestVisible() {
        await expect(this.msTestLink).toBeVisible()
    }

    async selectDropdownElement(selectedElement){
        if (selectedElement == 'Python') {
            await this.pythonLink.click()
        } 
        else if (selectedElement == 'Java') {
            await this.javaLink.click()
        }
        else if (selectedElement == '.NET') {
            await this.dotnetLink.click()
        }
    }
}
export default TopMenuPage;