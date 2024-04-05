const { Builder, By, until, Key } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
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

        await driver.get("https://www.waterstones.com/");
        let cookieButton = await driver.findElement(By.css("#onetrust-button-group > #onetrust-accept-btn-handler"));
        await sleep(1000);
        await driver.wait(until.elementIsVisible(cookieButton), TIMEOUT);
        cookieButton.click();
    });
      
    //action after all tests
    afterAll(async () => {
        //await driver.quit();
    });

    test('Test Open Web Page', async () => {
        //Verify that the web page has a Waterstones title.
        const pageTitle = await driver.findElement(By.css("#main-logos > div > a.logo")).getText();
        expect(pageTitle).toBe("Waterstones");
    })

    test('Test Search by Keyword', async () => {
        //Search for keyword “harry potter”
        const searchField = await driver.findElement(By.css("input.input-search"));
        searchField.click();
        searchField.sendKeys("harry potter");
        await driver.findElement(By.className("input-search-button icon")).click();

        //Verify that search is done by correct keyword
        const searchResult = await driver.findElement(By.css("div.main-page.row.search-results.search-results-books > div > p.breadcrumbs")).getText();
        expect(searchResult).toBe("You searched for: harry potter");

        //Verify that there are more than 1 products found.
        const searchCount = await driver.findElement(By.className("search-result-tab-all")).getText();
        const searchCountNum = parseInt(searchCount.replaceAll(/\D+/g, ""));
        expect(searchCountNum).toBeGreaterThan(1);
        
        //Verify that products presented have searched keyword in it.
        let itemTitles = await driver.findElements(By.css("div.title-wrap > a"));
        for (let title of itemTitles) {
            let titleHref = await title.getAttribute("href");
            expect(titleHref.toLowerCase().replace(/-/g, ' ')).toContain("harry potter");
        }
        
    })

    test('Test Sort searched items by price', async () => {
        //Verify that found products can be sorted.
        await driver.findElement(By.css("div.sort > div > div.trigger")).click();
        const sortByOptions = await driver.findElements(By.css("div.sort > div > ul.options.open > li"));
        expect(sortByOptions).toHaveLength(6);

        //Sort searched items by price
        await driver.findElement(By.xpath("//ul[@class='options open']/li[@data-raw-value='price-asc']")).click();

        //Verify that the products are sorted correctly.
        let itemPrices = await driver.findElements(By.css("div.book-price > span.price"));
        let firstPrice = parseFloat((await itemPrices[0].getText()).replace(/£/g, ""));
        let secondPrice = parseFloat((await itemPrices[1].getText()).replace(/£/g, ""));
        expect(firstPrice).toBeLessThan(secondPrice);
        
    })

    //Need to refactor these selectors later
    test('Test Items can be Filtered by Language', async () => {
        //Verify that products can be filtered by 6 languages: English, French, German, Spanish, Italian, Portugese
        const languages = new Array('English', 'French', 'Spanish', 'Italian', 'German', 'Portuguese');
        await driver.findElement(By.css("div.filters-array > div:nth-child(8) > div > div > a")).click();
        let filterByLanguageOptions = await driver.findElements(By.css("div.filters-array > div:nth-child(8) > div > div > ul > li > a"));
        expect(filterByLanguageOptions).toHaveLength(6);
        
        //option to check that our list contains page languages
        for (let pageLanguage of filterByLanguageOptions) {
            expect(languages.includes(await pageLanguage.getText()))
        }
    })

    test('Test Items can be Filtered by Format', async () => {
        //Filter products by Format, select filter as “Hardback”
        const format = await driver.findElement(By.xpath("//a[contains(text(), 'Hardback')]"));
        await driver.actions()
        .scroll(0, 0, 0, 0, format)
        .perform()
        format.click();
        
        //Verify that items selected have correct format.
        let itemsFormat = await driver.findElements(By.css("div.book-price > span:nth-child(3)"));
        for (let item of itemsFormat) {
            expect(await item.getText()).toContain("Hardback");
        }

        //Verify that products list contains less items now.

    })


    //shitty solution for now
    async function sleep(msec) {
        return new Promise(resolve => setTimeout(resolve, msec));
    }

})