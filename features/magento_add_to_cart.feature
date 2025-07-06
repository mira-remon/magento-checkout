Feature: Add products to cart with filters and validate discount and shipping

  Scenario Outline: Add Clothing product using filters and apply discount at checkout
    Given User is on the homepage
    And User navigates to "<Category>" -> "<Subcategory>" -> "<ItemType>"
    When User selects a <SelectionType> product
    And User applies filters: Size "<Size>", Color "<Color>"
    And User sets quantity to "<Quantity>" and adds it to the cart
    And User proceeds to checkout
    When User fills in shipping details and selects shipping country as "Netherlands"
    When User applies discount code "20poff"
    Then User places the order

  Examples:
    | Category | Subcategory | ItemType | Size | Color | Activity | Quantity | SelectionType |
    | Men      | Tops        | Jackets  | XS   | Blue  |          | 1        | first          |
    | Women    | Tops        | Jackets  | XS   | Blue  |          | 2        | first          |

  Scenario Outline: Add Gear product using filters
    Given User is on the homepage
    And User navigates to "<Category>" -> "<Subcategory>" -> "<ItemType>"
    When User selects a <SelectionType> product

  Examples:
    | Category | Subcategory | ItemType | Quantity | SelectionType |
    | Gear     | Bags        | Yoga     | 1        | random         |
