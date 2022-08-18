# janevalencia-jitera-qa-test
Applicant: **Jane Valencia**

Role: **Software Engineer in Test / QA Automation Engineer**

Company: **Jitera**

Kindly read the following document to understand the test coverage and strategy being used to complete the automation test for the purpose of this assessment.

Thank you!

## Assessment
This is the QA coding assignment with the purpose of testing the coding skill and automation skills of the candidates who apply to Jitera as QA Automation Engineer.

The full description of the QA Automation Assignment can be accessed [here](https://iruuzainc.notion.site/QA-Automation-Assignment-76584d8a16f74e28a9b98c2f99bce003).

In summary, the assessmment is to be graded based on:
- The coding style needs to be easy to read
- Apply POM design pattern
- Optional: JS/TS, Cucumber

The site to be tested is https://demo.guru99.com/V4/.

## Tools & Framework
- Tools / IDE: Visual Studio Code
- Framework: Cypress.io with POM (Page Object Model) design pattern
- Language: Javascript

## Project Setup & Run Cypress
1. Pre-requisite: You should already have Node.js installed or you can download the LTS version [here](https://nodejs.org/en/download/).
2. Clone or download from this repository (Branch: main).
3. Run `npm install` so that cypress modules can be installed for the project.
4. Start cypress by running `yarn run cypress:open` or (if you are using npm) `npm run cypress:open`.
5. Cypress GUI should now open up.
6. Select `E2E Testing`.
7. You may choose your browsers. For the purpose of this assessment, select `Start E2E Testing in Chrome`.
8. You should now see the list of specs (cypress tests) and simply click on the spec you wish to run.

Please do not hesitate to reach out if any of these steps are not working or you require further assistance.

## Test Scenario
For the purpose of this assessment, the automation scripts will be covering the following main test scenarios:
1. Verify that a new user should be able to signup for an account.
2. Verify that a registered user should be able to login to their account.
3. Verify that a logged in user should be able to add a new customer.

The details of the test cases created for each test scenario can be found in the the following spreadsheets/tabs:
- [TC_Signup]()
- [TC_Login]()
- [TC_Customer]()

In addition, I have also created the following temporary test account which to be used to throughout testing the test scenarios (i.e. login and add new customer), except for testing the signup scenario.

```
{
  "userID": "mngr432725",
  "password": "vemyjen"
}
```
**Note: The test user credential is saved under `cypress/fixtures/login.json`.**

#### TS_1: Verify that a new user should be able to signup for an account
This test scenario will be specficially be used to test the signup function of the site being tested, in particular:

*"As a new user, I should be able to signup for an account, so that I will be able to login to the site."*

The strategy I used in order to automate this test properly:
1. Create a custom cypress command which generates a test email + numerical timestamp to ensure that the email will be different each time the test is being run.
2. Validate that user can see the newly generated account (i.e. signup is successful).

#### TS_2: Verify that a registered user should be able to login to their account
This test scenario will be specficially be used to test the login function of the site being tested, in particular:

*"As a user, I should be able to login with my account, so that I can start using the service."*

The site that is being tested has some limitation, including how the account created will only be valid for 20 days (not persistent). Hence, for the purpose of this assessment, I decided to add two types of login testing:
1. Test that the existing test account saved in `cypress/fixtures/login.json` can be used for login.
2. Add a `before()` script to create a new account, then use the account to login.

Additionally, this test scenario will also cover the logout functionality.

#### TS_3: Verify that a logged in user should be able to add a new customer.
This test scenario will be specficially be used to test the adding new customer function of the site being tested, in particular:

*"As a login user, I should be able to access the customer menu, so that I can add a new customer."*

## Pull-Requests (PRs)
TBA

## Testing Screenshot & Recording
TBA

------

This repository which contains the solution created for Jitra QA assessment has been shared to the following Jitera's Github members:
- [harry](https://github.com/LeVinhGithub)
- [takuwan0405](https://github.com/takuwan0405)

Furthermore, the link to this repository has also been submitted via email at hr@jitera.com.

Thank you so much for the opportunity to be able to take on this assessment. I hope the solution presented here can highlight some of my experience and skill as QA / Software Engineer in Test. 

Please kindly reach out to me if there is any issue opening the document/sheet being shared here or you need further clarification towards the solution being presented. I look forward to hearing your feedback!
