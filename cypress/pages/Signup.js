class Signup {

    /**
     * Define form elements (wrapped in function).
     */
    constructor() {
        this.emailID = () => cy.get(`input[name="emailid"]`);
        this.signUpBtn = () => cy.get(`input[type="submit"]`);
        this.accountCreated = () => cy.get('.accpage');
    }

    /**
     * Go to Sign Up page.
     */
    start() {
        cy.visit('https://demo.guru99.com/');
    }

    /**
     * Execute signup - creating new login account.
     */
    signup() {
        // Enter valid email using custom Cypress command (/support/commands.js) to create random valid email.
        cy.typeValidEmailToSelector(`input[name="emailid"]`);

        // Click signup button.
        this.signUpBtn().click();
    }

    /**
     * Validate submitting invalid empty email to signup form.
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyEmail(expectedInputErrMsg) {
        // Click signup button.
        this.signUpBtn().click();

        // Check for invalid input message prompt.
        cy.get('#message9').should('have.text', expectedInputErrMsg);

        return this;
    }

    /**
     * Validate submitting invalid email address to signup form.
     * 
     * @param {String} invalidEmail 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateInvalidEmail(invalidEmail, expectedInputErrMsg) {
        // Enter empty email.
        this.emailID().type(invalidEmail);

        // Click signup button.
        this.signUpBtn().click();

        // Check for invalid input message prompt.
        cy.get('#message9').should('have.text', expectedInputErrMsg);
        
        return this;
    }

    /**
     * Validate successfully signup should return temporary id and password.
     */
    validateSuccessSignup() {
        // Check for generated user id should be visible.
        this.accountCreated().eq(0).siblings().should('be.visible');

        // Check for generated password should be visible.
        this.accountCreated().eq(1).siblings().should('be.visible');

        // Check for the warning message of account validity.
        cy.contains('valid only for 20 days').should('be.visible');
    }

    /**
     * Validate signup page UI elements upon visiting.
     */
    validateSignupPage() {
        // Check email input form.
        this.emailID()
            .should('exist')
            .should('be.visible');
        
        // Check for the submit button.
        this.signUpBtn()
            .should('be.visible')
            .should('be.enabled');
    }
}

export default Signup;