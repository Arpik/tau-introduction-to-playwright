import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';
import{
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
} from '@applitools/eyes-playwright';

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;

// Integrating Applitools

// export const USE_ULTRAFAST_GRID: boolean = true;
export const USE_ULTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;

// beforeAll for Applitools

test.beforeAll(async() => {

    if (USE_ULTRAFAST_GRID) {
        Runner = new VisualGridRunner({ testConcurrency: 5 });
    }
    else {
        Runner = new ClassicRunner();
    }
    
    const runnerName = (USE_ULTRAFAST_GRID) ? 'Ultrafast Grid' : 'Classic runner';
    Batch = new BatchInfo({name: `Playwright website - ${runnerName}`});
    
    Config = new Configuration();
    // Config.setApiKey("<your-api-key>");
    
    Config.setBatch(Batch);
    if (USE_ULTRAFAST_GRID) {
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);
        Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    }

});

test.beforeEach(async ({page}) => {

    // Applitools
    eyes = new Eyes(Runner, Config);
    await eyes.open(
        page, 
        'Playwright',
        test.info().title,
        {width: 1024, height: 768 }
    );
    //end of Applitools

    await page.goto(URL);
    homePage = new HomePage(page);
});

// Close the eyes
test.afterEach(async () => {
    await eyes.close();
});

test.afterAll(async() => {
// forces Playwright to wait synchronously for all visual checkpoints to complete.
  const results = await Runner.getAllTestResults();
  console.log('Visual test results', results);
})

async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page);
}

test.describe('Playwright website', () => {

    test.only('has title', async () => {
        await homePage.assertPageTitle();
        await eyes.check('Home page', Target.window().fully());
    });
    
    test.only('Get Started link', async ({ page }) => {
        // Act
        await clickGetStarted(page);
        // Assert
        await topMenuPage.assertPageUrl(pageUrl);
        await topMenuPage.assertNpmVisible();
        await eyes.check('Home page', Target.window().fully());
        // Also add here the label is Node.js
    });

    test.only('Check Python page', async ({ page }) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);
            await topMenuPage.hoverNode();
            await topMenuPage.selectDropdownElement("Python")
            await eyes.check('Python page', Target.window().fully().ignoreColors());
        });
      
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertPyPIVisible();
        });
    });
    
    test.only('Check Java page', async ({ page }) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);
            await topMenuPage.hoverNode();
            await topMenuPage.selectDropdownElement('Java');
            await eyes.check('Java page', Target.window().fully().ignoreColors());
        });
      
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertAppJavaVisible()
        });
    });

    // Add checks for .net
    test.only('Check .Net page', async ({ page }) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);
            await topMenuPage.hoverNode();
            await topMenuPage.selectDropdownElement('.NET');
            await eyes.check('.Net Page', Target.window().fully().ignoreColors());
        });
      
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertMSTestVisible()
        });
    });
});