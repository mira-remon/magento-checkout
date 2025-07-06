const { checkoutPage } = require('../support/pages/checkout');
const { faker } = require('@faker-js/faker');
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { expect } = require('@playwright/test');

let checkout;

Given("User is on the homepage", async function () {
  checkout = new checkoutPage(page);
  await checkout.gotoHome();
});

When("User navigates to {string} -> {string} -> {string}", async function (cat, sub, item) {
  await checkout.navigateTo(cat, sub, item);
});

When("User applies filters: Size {string}, Color {string}", async function (size, color) {
  await checkout.applyFilters(size, color);
});

When("User selects a {word} product", async function (type) {
  await checkout.selectProduct(type);
});

When("User sets quantity to {string} and adds it to the cart", async function (qty) {
  await checkout.setQuantityAndAddToCart(qty);
});

When("User proceeds to checkout", async function () {
  await checkout.proceedToCheckout();
});

When("User fills in shipping details and selects shipping country as {string}", async function (country) {
  await checkout.fillShippingDetails(country, faker);
});

When("User applies discount code {string}", async function (code) {
  await checkout.applyDiscount(code);
});

Then("User places the order", async function () {
  await checkout.placeOrder();
});

When("User applies filters: Type {string}, SubCategory {string}", async function (type, subCat) {
  await checkout.applyGearFilters(type, subCat);
});
