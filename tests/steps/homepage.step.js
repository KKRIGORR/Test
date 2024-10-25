const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");

setDefaultTimeout(60 * 1000);

Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

Given('I am on the calculator page', async function () {
    await this.page.goto('http://juliemr.github.io/protractor-demo/');
});

When('I enter the number {string} into the first input', async function (firstNumber) {
    await this.page.fill('input[ng-model="first"]', firstNumber);
});

When('I enter the number {string} into the second input', async function (secondNumber) {
    await this.page.fill('input[ng-model="second"]', secondNumber);
});

When('I select {string} operation', async function (operation) {
    const operationsMap = {
        "ADDITION": "ADDITION",
        "SUBTRACTION": "SUBTRACTION",
        "MULTIPLICATION": "MULTIPLICATION",
        "DIVISION": "DIVISION"
    };
    await this.page.selectOption('select[ng-model="operator"]', operationsMap[operation]);
});

When('I click "Go!"', async function () {
    await this.page.click('button[ng-click="doAddition()"]'); 
});

Then('I should see the result {string}', async function (expectedResult) {
    await this.page.waitForTimeout(5000);
  
    const result = await this.page.textContent('h2');
    expect(result.trim()).toBe(expectedResult); 
});

Then('the history should show {string}', async function (expectedHistory) {
    await this.page.waitForSelector('table');

    const historyElements = await this.page.$$('table tbody tr:nth-child(1) td:nth-child(2) span');
    
    const historyText = await Promise.all(historyElements.map(async (element) => {
        return element.textContent();
    }));

    const fullHistoryText = historyText.join(' ').trim();
    expect(fullHistoryText).toBe(expectedHistory);
});

After(async function () {
    await this.browser.close();
});
