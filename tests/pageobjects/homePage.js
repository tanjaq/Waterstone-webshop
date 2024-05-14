const Page = require("./basePage");
let Cartpage = require("./cartPage");
const { By } = require("selenium-webdriver");

const TIMEOUT = 5000;

const baseUrl = "https://www.waterstones.com/";

// home page element locators
const cookieButton = By.css(
  "#onetrust-button-group > #onetrust-accept-btn-handler"
);
const pageTitleElement = By.css("#main-logos > div > a.logo");
const searchField = By.className("input input-search");
const searchButton = By.className("input-search-button icon");
const searchResultKeyword = By.className("search-result-tab-all");
const searchResultImg = By.css("div.book-thumb > div > a > img");
const searchResultBasket = By.className(
  "button-buy button button-teal button-small"
);

const cartButton = By.css("a.basket > strong");

module.exports = class Homepage extends Page {
  async openUrl() {
    await super.openUrl(baseUrl);
  }

  async agreeWithCookies() {
    await super.sleep(TIMEOUT);
    await super.findAndClick(cookieButton);
  }

  async verifyPageTitleContains(text) {
    let pageTitle = await super.getElementText(pageTitleElement);
    expect(pageTitle).toBe(text);
  }

  async searchForText(text) {
    await super.sendText(searchField, text);
    await super.findAndClick(searchButton);
  }

  async hoverOverProduct(elementNum) {
    const imageElements = await super.getElements(searchResultImg);
    await super.hoverOverElement(imageElements[elementNum - 1]);
  }

  async verifySearchResultCount(searchAmount) {
    const searchCount = await super.getElementText(searchResultKeyword);
    const searchCountNum = searchCount.replaceAll(/\D+/g, "");
    expect(parseInt(searchCountNum)).toBeGreaterThan(searchAmount);
  }

  async addProductToCart(elementNum) {
    let basketElem = await super.getElements(searchResultBasket);
    await super.click(basketElem[elementNum - 1]);
  }

  async verifyProductIsAddedToBasket(elementNumber) {
    await super.waitUntilElementText(cartButton, elementNumber.toString());
  }

  async goToShoppingCart() {
    await super.waitUntilElementVisible(cartButton);
    await super.findAndClick(cartButton);
    return new Cartpage(super.getDriver());
  }
};
