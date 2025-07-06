const { BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let context;
global.page = null;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 50 });
  context = await browser.newContext();

  await context.route('**/*', (route) => {
    const url = route.request().url();
    if (url.includes('googleads') || url.includes('doubleclick') || url.includes('adservice')) {
      return route.abort();
    }
    return route.continue();
  });

  global.page = await context.newPage();
});

AfterAll(async () => {
  await browser.close();
});
