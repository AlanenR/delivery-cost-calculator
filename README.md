# Delivery Cost Calculator

1. [About The App and Approach](#about-the-app-and-approach)
2. [Technologies](#technologies)
3. [Setup](#setup)
4. [Testing](#testing)
5. [Specification](#specification)
6. [Frontend specifics](#frontend-specifics)

## About The App and Approach

This App is a delivery cost calculator application.

The app calculates a delivery fee based on user input:
- Number of items
- Cart value (euros)
- Delivery distance (meters)
- Order time (dd-mm-yyyy HH:mm)

The App shows the calculated delivery fee to the user in euros and rounds the fee to two decimals.

![Delivery Fee Calculator](/src/assets/images/delivery-calculator.png)

This project is focused on the working calculator logic, testing the calculations, and good readability.


## Technologies

The App is build using the Create React App project with TypeScript (https://create-react-app.dev/docs/adding-typescript/), and the project supports CSS Modules (https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/).

## Setup

### Getting Started with Create React App

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm install`
Installs the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Testing

All tests can be run following the standard ['npm test'](#test) command mentioned in the project setup.
Unit tests are divided in three folders:
- Component tests: src/components/\_tests\_
- Utils tests: src/utils/\_tests\_
- Containers tests: src/containers/\_tests\_

**data-testid** values:
- Cart value: **cartValue**
- Delivery distance: **deliveryDistance**
- Number of items: **numberOfItems**
- Order time: **orderTime**
- Resulting fee: **fee**



## Specification

Rules for calculating a delivery fee:

- If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.
- A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.
    - Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
    - Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
    - Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€
- If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€
    - Example 1: If the number of items is 4, no extra surcharge
    - Example 2: If the number of items is 5, 50 cents surcharge is added
    - Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
    - Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)
- The delivery fee can never be more than 15€, including possible surcharges.
- The delivery is free (0€) when the cart value is equal or more than 100€.
During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€).

## Frontend specifics

#### Input fields

| Field             | Type      | Description                                                                                             | Example value                             |
|:---               |:---       |:---                                                                                                     |:---                                       |
|Cart value         |Float      |Value of the shopping cart in euros.                                                                     |__20__                                     |
|Delivery distance  |Integer    |The distance between the store and customer’s location __in meters__.                                    |__2235__ (2235 meters = 2.235 km)          |
|Number of items    |Integer    |The __number of items__ in the customer's shopping cart.                                                 |__4__ (customer has 4 items in the cart)   |
|Order time         |Date + Time|The date/time when the order is being made (see rules-section how rush hours affect the delivery price)  |YYYY-MM-DDThh:mm    |
