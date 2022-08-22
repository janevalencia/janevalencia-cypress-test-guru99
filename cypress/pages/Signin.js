/// <reference types="Cypress" />
class Signin {

    /**
     * Define form elements (wrapped in function).
     */
    constructor() {
        this.loginBtn = () => cy.get('input[name="btnLogin"]');
        this.resetBtn = () => cy.get('input[name="btnReset"]');
        this.userID = () => cy.get('input[name="uid"]');
        this.password = () => cy.get('input[name="password"]');
    }

    /**
     * Go to the login start page of Guru99.
     */
    start() {
        cy.visit('/');
    }

    /**
     * Execute login action and validate successful login.
     * 
     * @param {String} validUserID 
     * @param {String} validPwd 
     */
    signin(userID, pwd) {
        // Enter user ID and password to login form.
        this.inputUserCreds(userID, pwd);

        // Click on login button.
        this.loginBtn().click();

        // Validate URL to check login is successful.
        cy.url().should('include', 'manager/Managerhomepage.php');

        // Validate the logged-in manager ID.
        cy.contains(`Manger Id : ${userID}`).should('be.visible');
    }

    /**
     * Fill in the sign-in form with given userID and password.
     * 
     * @param {String} userID 
     * @param {String} pwd 
     */
    inputUserCreds(userID, pwd) {
        // Enter userID into the login form.
        this.userID().type(userID);

        // Enter password into the login form.
        this.password().type(pwd);
    }

    /**
     * Validate error message for empty User ID input field.
     * 
     * @param {String} expectedInputErrMsg 
     */
    validateEmptyUserID(expectedInputErrMsg) {
        // Trigger the input error prompt by pressing backspace key on User ID input-form.
        this.userID().type('{backspace}');

        // Check for invalid input error message prompt for User ID input-form.
        cy.get('#message23').should('have.text', expectedInputErrMsg);

        return this;
    }

    /**
     * Validate error message for empty Password input field.
     * 
     * @param {String} expectedInputErrMsg 
     */
    validateEmptyPassword(expectedInputErrMsg) {
        // Trigger the input error prompt by pressing backspace key on Password input-form.
        this.password().type('{backspace}');

        // Check for invalid input error message prompt for Password input-form.
        cy.get('#message18').should('have.text', expectedInputErrMsg);

        return this;
    }

    /**
     * Validate UI elements in login page.
     * 
     */
    validateLoginPage() {
        this.userID()
            .should('exist')
            .should('be.visible');

            this.password()
            .should('exist')
            .should('be.visible');

        this.loginBtn()
            .should('be.visible')
            .should('be.enabled')
            .should('have.value', 'LOGIN');

        this.resetBtn()
            .should('be.visible')
            .should('be.enabled')
            .should('have.value', 'RESET');
    }

    /**
     * Validate the input form are clear once reset.
     * 
     */
    validateResetForm() {
        // Click on the RESET button.
        this.resetBtn().click();

        // Check that user ID input form is clear.
        this.userID().should('have.value', '');

        // Check that user ID input form is clear.
        this.password().should('have.value', '');
    }

    /**
     * Validate the input form value matches with the entered User ID.
     * 
     * @param {String} inputID 
     */
    validateUserIDInputValue(inputID) {
        // Check the userID input form has the entered value.
        this.userID()
            .invoke('val')
            .then((text) => {
                expect(text).to.contain(inputID);
            });
    }

    /**
     * Validate the input form value matches with the entered Password.
     * 
     * @param {String} inputPwd 
     */
    validatePwdInputValue(inputPwd) {
        // Check the password input form has the entered value.
        this.password()
            .invoke('val')
            .then((text) => {
                expect(text).to.contain(inputPwd);
            });
    }

    /**
     * Execute sign-in without entering valid login account.
     * 
     * Note:
     * There is a limitation to the testing site
     * as Cypress is unable to auto-close the window:alert.
     * It is to be explored further.
     * 
     * @param {String} expectedAlertErrMsg 
     */
    validateInvalidSignIn(expectedAlertErrMsg) {
        // Click on login button.
        this.loginBtn().click();

        // Check the fired invalid signin alert box.
        cy.on('window:alert', (prompt) => {
            expect(prompt).to.contains(expectedAlertErrMsg);
        })
    }
}

export default Signin;