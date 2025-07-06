class checkoutPage {
  constructor(page) {
    this.page = page;
  }

  async gotoHome() {
    await this.page.goto("https://magento.softwaretestingboard.com/");
    await this.page.reload({ waitUntil: 'load' });

    const consentButton = this.page.locator('button:has-text("Consent")');
    if (await consentButton.isVisible({ timeout: 5000 })) {
      await consentButton.click();
    }

    const adCloseButton = this.page.locator('button[aria-label="Close ad"], .close, .dismiss-button');
    if (await adCloseButton.first().isVisible({ timeout: 2000 })) {
      await adCloseButton.first().click().catch(() => {});
    }
  }

  async navigateTo(category, subcategory, itemType) {
    await this.page.click(`:text-is("${category}")`);
    await this.page.waitForURL(`**/${category.toLowerCase()}.html`, { timeout: 5000 });
    const itemLink = this.page.locator(`div.categories-menu a:has-text("${itemType}")`);
    await itemLink.scrollIntoViewIfNeeded();
    await itemLink.waitFor({ timeout: 5000 });
    await itemLink.click();
  }

  async applyFilters(size, color) {
    const sizeFilter = this.page.locator(`div[option-label="${size}"]`);
    await sizeFilter.scrollIntoViewIfNeeded();
    await sizeFilter.click({ force: true });

    const colorFilter = this.page.locator(`div[option-label="${color}"]`);
    await colorFilter.scrollIntoViewIfNeeded();
    await colorFilter.click({ force: true });
  }

  async selectProduct(selectionType = "first") {
    await this.page.waitForSelector(".product-item-link", { timeout: 5000 });
    const products = await this.page.locator(".product-item-link").elementHandles();
    if (products.length === 0) throw new Error("No products found");

    const index = selectionType === "random" ? Math.floor(Math.random() * products.length) : 0;
    await products[index].scrollIntoViewIfNeeded();
    await products[index].click();
  }

  async setQuantityAndAddToCart(qty) {
    const qtyInput = this.page.locator("input.qty");
    await qtyInput.fill(qty);
    const addToCart = this.page.locator('button:has-text("Add to Cart")');
    await addToCart.click();
    await this.page.waitForSelector(".message-success", { timeout: 10000 });

    const cartLink = this.page.locator('div.message-success a:has-text("shopping cart")');
    await cartLink.scrollIntoViewIfNeeded();
    await cartLink.click();
  }

  async proceedToCheckout() {
    const checkoutBtn = this.page.locator('button[data-role="proceed-to-checkout"]');
    await checkoutBtn.scrollIntoViewIfNeeded();
    await checkoutBtn.click({ force: true });
    await this.page.goto('https://magento.softwaretestingboard.com/checkout/#shipping');
  }

  async fillShippingDetails(country, faker) {
    await this.page.locator('input[name="firstname"]').fill(faker.person.firstName());
    await this.page.locator('input[name="lastname"]').fill(faker.person.lastName());
    await this.page.locator('input[name="company"]').fill(faker.company.name());
    await this.page.locator('input[name="street[0]"]').fill(faker.location.streetAddress());
    await this.page.locator('input[name="city"]').fill(faker.location.city());
    await this.page.locator('#customer-email').first().fill(faker.internet.email());

    await this.page.selectOption('select[name="country_id"]', { label: country });
    await this.page.waitForTimeout(500);

    const region = this.page.locator('select[name="region_id"]');
    if (await region.isVisible()) {
      const options = await region.locator('option').all();
      if (options.length > 1) await region.selectOption({ index: 1 });
    }

    await this.page.locator('input[name="postcode"]').fill(faker.location.zipCode('####AA'));
    await this.page.locator('input[name="telephone"]').fill(faker.phone.number('0612345678'));

    const method = this.page.locator('input[type="radio"][name="ko_unique_1"]');
    if (await method.isVisible()) await method.first().check();

    await this.page.locator('button:has-text("Next")').click();
  }

  async applyDiscount(code) {
    await this.page.locator('#block-discount-heading').click();
    await this.page.locator('#discount-code').fill(code);
    await this.page.locator('button.action-apply').click();
    await this.page.waitForSelector('.message-success, .message-error', { timeout: 7000 });
  }

  async placeOrder() {
    const placeOrderButton = this.page.locator('button[title="Place Order"]');
    await placeOrderButton.waitFor({ timeout: 7000 });
    await placeOrderButton.click();
    await page.context().clearCookies();
    await page.context().clearPermissions();
  }
  async applyGearFilters(type, subCat) {
    const typeFilter = this.page.locator(`label:has-text("${type}")`);
    await typeFilter.scrollIntoViewIfNeeded();
    await typeFilter.click({ force: true });
    const subCatFilter = this.page.locator(`label:has-text("${subCat}")`);
    await subCatFilter.scrollIntoViewIfNeeded();
    await subCatFilter.click({ force: true });
}

}
module.exports = { checkoutPage };
