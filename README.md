# janevalencia-jitera-qa-test
Applicant Name: Jane Valencia

Role: Software Engineer in Test / QA Automation Engineer

Company: Jitera

Kindly read the following document to understand the test coverage and strategy being used to complete the automation test for the purpose of this assessment.

## Introduction
This is the QA coding assignment with the purpose of testing the coding skill and automation skills of the candidates who apply to Jitera as QA Automation Engineer.

The full description of the QA Automation Assignment can be accessed [here](https://iruuzainc.notion.site/QA-Automation-Assignment-76584d8a16f74e28a9b98c2f99bce003).

In summary, the assessmment is to be graded based on:
- The coding style needs to be easy to read
- Apply POM design pattern
- Optional: JS/TS, Cucumber

The site to be tested is https://demo.guru99.com/V4/.

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
This test scenario will be specficially be used to test the signup functionality of the site being tested, in particular:

*As a user, I should be able to signup for a new account, so that I will be able to login to the site.*

The strategy I used 

#### TS_2: Verify that a registered user should be able to login to their account

#### TS_3: Verify that a logged in user should be able to add a new customer.
