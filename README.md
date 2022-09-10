# janevalencia-cypress-test-guru99
Role: **Software Engineer in Test / QA Automation Engineer**

Task to be graded based on:
- The coding style needs to be easy to read
- POM design pattern
- JS/TS proficiency

The site to be tested is https://demo.guru99.com/V4/.

## Tools & Framework
- Tools / IDE: Visual Studio Code
- Git Client: GitHub
- Framework: Cypress.io with POM (Page Object Model) design pattern
- Language: Javascript (Mocha Chai syntax).

## Project Setup & Run Cypress
1. Pre-requisite: You should already have Node.js installed or you can download the LTS version [here](https://nodejs.org/en/download/).
2. Clone or download from this repository (Branch: main).
3. Run `npm install` so that cypress modules can be installed for the project.
4. Start cypress by running `yarn run cypress:open` (for the GUI)
5. Cypress GUI should now open up.
6. Select `E2E Testing`.
7. You may choose your browsers. For the purpose of this assessment, select `Start E2E Testing in Chrome`.
8. You should now see the list of specs (cypress tests) and simply click on the spec you wish to run.

If you prefer to run the test on CLI:
- Run all tests: `yarn run cypress:run`
- To run specific test: `yarn run cypress:spec "cypress/e2e/[insert test folder]/[insert name of test_spec.cy.js]"`.

Please do not hesitate to reach out if any of these steps are not working or you require further assistance.

## Test Scenario
For the purpose of this assessment, the automation scripts will be covering the following main test scenarios:
1. Verify that a new user should be able to signup for an account.
2. Verify that a registered user should be able to login to their account.
3. Verify that a logged in user should be able to add a new customer.

The details of the test cases created for each test scenario can be found in the the following [spreadsheet](https://docs.google.com/spreadsheets/d/1k9tS9BfSCjUXvxL6lgtluAWGVuZh-c5R8s7MlHx0v58/edit#gid=0).

In addition, I have also created the following temporary test account which to be used to throughout testing the test scenarios (i.e. login and add new customer), except for testing the signup scenario.

```
{
  "userID": "mngr432725",
  "password": "vemyjen"
}
```
**Note: The test user credential is saved under `cypress/fixtures/login.json`.**

The credential might be obsolete as it should expire within 20 days, hence, you may need to replace with the newly generated guru99 credential.

#### TS_1: Verify that a new user should be able to signup for an account
This test scenario will be specficially be used to test the signup function of the site being tested, in particular:

*"As a new user, I should be able to signup for an account, so that I will be able to login to the site."*

The strategy I used in order to automate this test properly:
1. Create a custom cypress command which generates a test email + numerical timestamp to ensure that the email will be different each time the test is being run.
2. Validate that user can see the newly generated account (i.e. signup is successful).


The detail test cases created for **SignUp test scenario** can be found [TC_Signup](https://docs.google.com/spreadsheets/d/1k9tS9BfSCjUXvxL6lgtluAWGVuZh-c5R8s7MlHx0v58/edit#gid=0).

#### TS_2: Verify that a registered user should be able to login to their account
This test scenario will be specficially be used to test the login function of the site being tested, in particular:

*"As a user, I should be able to login with my account, so that I can start using the service."*

For this testing purpose, we will be fetching the login data from cypress-fixture `cypress/fixtures/login.json`.

The detail test cases created for **Login test scenario** can be found [TC_Login](https://docs.google.com/spreadsheets/d/1k9tS9BfSCjUXvxL6lgtluAWGVuZh-c5R8s7MlHx0v58/edit#gid=738327809)

Out of scope:
1. Testing the logout functionality

#### TS_3: Verify that a logged in user should be able to add a new customer.
This test scenario will be specficially be used to test the adding new customer function of the site being tested, in particular:

*"As a login user, I should be able to access the customer menu, so that I can add a new customer."*

The detail test cases created for **Add Customer test scenario** can be found [TC_Customer](https://docs.google.com/spreadsheets/d/1k9tS9BfSCjUXvxL6lgtluAWGVuZh-c5R8s7MlHx0v58/edit#gid=1731047278).

## Pull-Requests (PRs)

Each PRs describe the step by step processes and test result snippet. Please go to [here](https://github.com/janevalencia/janevalencia-cypress-test-guru99/pulls?q=is%3Apr+is%3Aclosed)

------

Thank you!
