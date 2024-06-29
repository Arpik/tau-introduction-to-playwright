import { StitchMode } from '@applitools/eyes-playwright';
import { expect, Locator, Page } from '@playwright/test';
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
    
    readonly docsLabel: Locator;
    readonly apiLabel: Locator;
    readonly nodeLabel: Locator;
    readonly communityLabel: Locator;

    readonly nodejsLabel: Locator;
    readonly pythonLabel: Locator;
    readonly javaLabel: Locator;
    readonly dotnetLabel: Locator;
  
    readonly nodeDescription: string = 'Installing Playwright';
    readonly javaDescription: string = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
    readonly docsDescription: string = 'Installation';
    readonly apiDescription: string = 'Playwright Library';
    readonly communityDescription: string = 'Wellcome'

    // Distinct variables for each page


    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.docsLink = page.getByRole('button', {name: 'Docs'})
        this.apiLink = page.getByRole('button', {name: 'API'})
        this.communityLink = page.getByRole('button', {name: 'Community'})
        this.nodeLink = page.getByRole('button', {name: 'Node.js'});
        
        this.nodejsLink = page.getByRole('navigation', {name: 'Main'}).getByText('Node.js');
        this.pythonLink = page.getByRole('navigation', {name: 'Main'}).getByText('Python');
        this.javaLink = page.getByRole('navigation', { name: 'Main' }).getByText('Java');
        this.dotnetLink = page.getByRole('navigation', { name: 'Main' }).getByText('.NET');
        this.npmLink = page.getByRole('tab', { name: 'npm'});

        // Don't understand this part..
        this.nodeLabel = page.getByText(this.nodeDescription, {exact:true});
        this.javaLabel = page.getByText(this.javaDescription);
        this.docsLabel = page.getByText(this.docsDescription);
        this.apiLabel = page.getByText(this.apiDescription);
        this.communityLabel = page.getByText(this.communityDescription)
    }

    async hoverNode() {
        await this.nodeLink.hover();
    }
    
    async clickJava() {
        await this.javaLink.click();
    }

    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }

    async assertNodeDescriptionNotVisible() {
        await expect(this.nodeLabel).not.toBeVisible();
    }

    async assertPythonDescriptionVisible() {
        await expect(this.pythonLabel).toBeVisible();
    }

    async selectDropdownElement(dropdownElement){
        if(dropdownElement == this.pythonLink) {
            await expect(this.npmLink).toBeVisible();
        } 
    }

}
export default TopMenuPage;