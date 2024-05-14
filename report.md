# Selenium WebDriver Testing Report

# Overview

This report outlines the implementation and results of Selenium WebDriver tests aimed at verifying various functionalities Waterstone. The scripts check the shopping cart operations, filter menu, and search functionality using the page object model for better maintainability.

## Page Object Model (POM) Implementation

1. Base Page: Contains common properties and methods that can be used across all page objects.
2. Home Page: Specific methods for interactions on the homepage.
3. Cart Page: Encapsulates all methods necessary for cart interactions.

### Base Page (Page)

This class provides the basic functionalities needed for page-specific classes to inherit.

**Methods**:

- openUrl(url): Opens a URL.
- sleep(milliseconds): Pauses the execution for a specified duration.
- findAndClick(locator): Finds an element and performs a click operation.
- click(element): Clicks on the provided element.
- getElement(locator): Returns a single web element.
- getElements(locator): Returns a list of web elements.
- getElementText(locator): Retrieves the text of a specified element.
- sendText(locator, text): Sends text to a specified element.
- hoverOverElement(element): Hovers over a specified element.
- waitUntilElementText(locator, text): Waits until the element's text is as expected.
- waitUntilElementVisible(locator): Waits until the element is visible.

### Home Page (HomePage)

**Methods**:

- agreeWithCookies(): Handles the cookie agreement.
- verifyPageTitleContains(text): Checks if the page title contains a certain string.
- searchForText(text): Enters a text in the search field and submits the search.
- hoverOverProduct(productNumber): Hovers over a product based on its index.
- verifySearchResultCount(expectedCount): Verifies the count of search results.
- addProductToCart(productNumber): Adds a product to the cart.
- verifyProductIsAddedToBasket(productNumber): Checks if a product is added to the basket.
- goToShoppingCart(): Navigates to the shopping cart page.

### Cart Page (CartPage)

**Methods**:

- verifyCartSumIsCorrect(): Verifies the total sum of items in the cart matches the expected sum.
- removeFirstItemFromCart(): Removes the first item from the cart.
- verifyCartHasItems(expectedNumber): Verifies the number of items in the cart.

## Tests

### Shopping cart functionality

1. Page Opens: Confirms the homepage title contains "Waterstones".
2. Search Operation: Searches for "minecraft" and checks if the result count is correct.
3. Add to Cart: Adds first and second listed products to the shopping cart and verifies if they are added correctly.
4. Shopping Cart Navigation: Navigates to the shopping cart page.
5. Remove from Cart: Removes the first item and verifies the remaining items in the cart.

### Search Functionality

1. Page Opens: Confirms the homepage title contains "Waterstones".
2. Search Operation: Searches for "harry potter" and verifies the result count.

### Filter Menu

1. Chrome browser initiated and maximized.
2. Cookies agreement handled.
