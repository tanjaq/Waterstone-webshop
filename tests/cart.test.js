const { Builder } = require("selenium-webdriver");
let Homepage = require("./pageobjects/homePage");
let CartPage = require("./pageobjects/cartPage");
require("chromedriver");

const TIMEOUT = 5000;

describe("Verifying that the shopping cart behaves correctly", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    driver.manage().window().maximize();
    driver
      .manage()
      .setTimeouts({ implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });

    Homepage = new Homepage(driver);
    await Homepage.openUrl();
    await Homepage.agreeWithCookies();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("The page opens", async () => {
    await Homepage.verifyPageTitleContains("Waterstones");
  });

  test("The search behaves correctly", async () => {
    await Homepage.searchForText("minecraft");
    await Homepage.verifySearchResultCount(1);
  });

  test("The first item adds to the shopping cart correctly", async () => {
    await Homepage.hoverOverProduct(1);
    await Homepage.addProductToCart(1);
    await Homepage.verifyProductIsAddedToBasket(1);
  });

  test("The first item adds to the shopping cart correctly", async () => {
    await Homepage.hoverOverProduct(2);
    await Homepage.addProductToCart(2);
    await Homepage.verifyProductIsAddedToBasket(2);
  });

  test("Shopping cart page works", async () => {
    CartPage = await Homepage.goToShoppingCart();
  });

  test("A product could be removed from the cart", async () => {
    await CartPage.removeFirstItemFromCart();
    await CartPage.verifyCartHasItems(1);
  });
});
