# 🛒 Magento E-Commerce Automation Task

## 📌 Introduction

This project is an automated end-to-end testing framework for an e-commerce site based on [https://magento.softwaretestingboard.com](https://magento.softwaretestingboard.com). It validates key user journeys including browsing products, applying filters, completing checkout, and verifying success messages.

### 🔧 Technologies Used

* **Playwright**: The main automation framework used to simulate real user actions in the browser.
* **Cucumber (with Playwright)**: Allows for writing scenarios in plain English (Gherkin) for better collaboration.
* **Faker.js**: Used for generating realistic and randomized test data (e.g. shipping details).

> All automation is written using the Page Object Model (POM) design pattern to promote reuse and maintainability.

---

## 📁 Project Structure

```
magento-playwright/
├── features/
│   ├── magento_add_to_cart.feature      # Gherkin feature file with scenario outlines
│   └── step_definitions/
│       └── add_to_cart.steps.js         # Step definitions linked to POM
├── support/pages/
│   └── checkout.js                      # Page Object Model for the Magento checkout journey
├── fixtures/
│   └── products.json                    # Test data (e.g., scenarios, filters)
├── package.json                         # Project scripts and dependencies
├── README.md                            # Project documentation (this file)
```

---

## ✅ What’s Implemented

### UI Test Scenarios (Cucumber-based)

* Navigate via category → subcategory → item type
* Select random or first product from list
* Apply filters (Size, Color, etc.)
* Add item(s) to cart
* Proceed to checkout
* Fill shipping form using random Faker data
* Apply discount code: `20poff`
* Place the order
* Assert that the order is successfully placed

---

## 🚀 How to Run the Tests

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the test suite

```bash
npm run test
```

> The test will run through all scenario outlines in the `.feature` file.

---

## 🧪 Test Types

* **Clothing products**: Full flow with filters, checkout, and order placement.
* **Gear products**: Filtered selections with random product selection.

---

## 📄 Reporting & Debugging

Currently, results are shown in the test reoprt cucumber-report.html
You can also use:

```bash
PWDEBUG=1 npm run test
```

to run in **debug mode** using Playwright Inspector.

---

## 🛠 If I Had More Time

### 1. Robust Error Handling

The Magento demo site has intermittent popups and delays. I would improve error handling around:

* Missing or slow-loading locators
* Fallback for missing elements (e.g. discounts that don’t apply)
* Retry logic for known flaky parts

### 2. CI/CD Pipeline Integration

With more time, I would:

* Add GitHub Actions workflow to run tests on push
* Collect and archive HTML reports and console logs
* Run smoke tests only on PRs, full suite nightly

### 3. Visual Regression Testing

Integrate **Playwright Visual Comparisons** (or Percy) to:

* Detect UI layout breaks
* Validate product tiles, checkout layout, etc.

### 4. More Diverse Test Data

Expand `products.json` to cover:

* Out-of-stock items
* Multivariant products (e.g. size + color + price + brand)
* Negative cases (invalid address, declined payments)

---

## ✨ Summary

This project demonstrates a scalable Playwright+Cucumber test framework that validates end-to-end purchase flows using randomized data and clean Page Object modeling. It serves as a solid foundation for extending coverage and integrating into CI pipelines.
