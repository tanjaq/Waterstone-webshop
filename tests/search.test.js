const { Builder, By, until } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome');
let Homepage = require('../pageobjects/homePage');
require('chromedriver')

const TIMEOUT = 5000;

describe('Search products by keywords', () => {

    let driver;
    
    //if you want to add something before/after each test, use beforeEach and afterEach
    //action before all tests
    beforeAll(async() => {
        driver = await new Builder()
        .forBrowser('chrome')
        //If you want to open browser, uncomment next line
        //.setChromeOptions(new chrome.Options().addArguments('--headless'))
        .build();
        driver.manage().window().maximize();
        driver.manage().setTimeouts({implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT});

        Homepage = new Homepage(driver);
        await Homepage.openUrl();
        await Homepage.agreeWithCookies();
    });
      
    //action after all tests
    afterAll(async () => {
        await driver.quit();
    });

    test('Test Open Web Page', async () => {
        await Homepage.verifyPageTitleContains("Waterstones");
    })

    test('Test Search by Keyword', async () => {
        await Homepage.searchForText("harry potter");
        await Homepage.verifySearchResultsText("harry potter");
        await Homepage.verifySearchResultsCount(1);
        await Homepage.verifyAllSearchItemsContainText("harry potter");    
    })

    test('Test Sort searched items by price', async () => {
        await Homepage.verifyProductsSortOptions(6);
        await Homepage.sortResultsByPrice();
        await Homepage.verifyResultsAreSortedByPrice();
    })

    test('Test Items can be Filtered by Language', async () => {
        await Homepage.verifyProductsLanguageFilterOptions();
        await Homepage.verifyProductLanguageFilter();
    })

    test('Test Items can be Filtered by Format', async () => {
        await Homepage.filterResultsByFormat("Hardback");
        await Homepage.verifyResultsAreFiltered("Hardback");

        //Verify that products list contains less items now.
    })

})