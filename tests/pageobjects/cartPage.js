const Page = require("./basePage");
const { By } = require("selenium-webdriver");

const cartItemPrices = By.className("lblTotalItem lblTotalItemCost");
const cartTotalSum = By.css(
  "body > div.row.chk-surround.large-min-height > div.large-6.chk-right.columns.show-for-large > div > div > div.float-left.position-relative.full-width.large-margin-top-24 > div > div.row.panel-total-to-pay > div.large-11.columns.large-padding-top-8.large-border-dotted-top.large-padding-left-0 > div > p > span"
);
const cartFirstItem = By.css(
  "body > div.row.chk-surround.large-min-height > div.small-24.chk-left.medium-24.large-18.columns.main-container > div.panel-basket.panel-content-basket > div > ul > li:nth-child(1) > div > div.panel-basket-item > div.small-19.medium-12.columns.medium-margin-left-4.small-padding-left-0.small-padding-right-0 > ul > li:nth-child(2) > a"
);
const cartItemCount = By.css(
  "body > div.row.chk-surround.large-min-height > div.large-6.chk-right.columns.show-for-large > div > div > div.float-left.position-relative.full-width.large-margin-top-24 > div > div:nth-child(2) > div > p > a > span.lblBasketQuantity"
);

module.exports = class CartPage extends Page {
  async verifyCartSumIsCorrect() {
    let itemPrices = await super.getElements(cartItemPrices);

    let itemsSum = 0;
    for (let item of itemPrices) {
      itemsSum += parseFloat((await item.getText()).replace(/£/g, ""));
    }

    let basketSum = await super.getElementText(cartTotalSum);
    const basketSumNum = parseFloat(basketSum.replace(/£/g, ""));

    expect(basketSumNum).toBe(firstPrice + secondPrice);
  }

  async removeFirstItemFromCart() {
    await super.findAndClick(cartFirstItem);
  }

  async verifyCartHasItems(number) {
    await super.waitUntilElementText(cartItemCount, number.toString());
  }
};
