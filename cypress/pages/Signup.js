class Signup {
    // Go to signup URL.
    start() {
        cy.visit('https://demo.guru99.com/');
    }

    // Execute signup action.
    signup() {
        // Enter valid email using custom Cypress command (/support/commands.js) to create random valid email.
        cy.typeValidEmailToSelector(`input[name="emailid"]`);

        // Click signup button.
        cy.get(`input[type="submit"]`).click();

        return this;
    }

    // Validate submitting invalid empty email to signup form.
    validateEmptyEmail(expectedInputMsg) {
        // Click signup button.
        cy.get(`input[type="submit"]`).click();

        // Check for invalid input message prompt.
        cy.get('#message9').should('have.text', expectedInputMsg);

        return this;
    }

    // Validate submitting invalid email address to signup form.
    validateInvalidEmail(invalidEmail, expectedInputMsg) {
        // Enter empty email.
        cy.get(`input[name="emailid"]`).type(invalidEmail);

        // Click signup button.
        cy.get(`input[type="submit"]`).click();

        // Check for invalid input message prompt.
        cy.get('#message9').should('have.text', expectedInputMsg);
        
        return this;
    }

    // Validate successfully signup should return temporary id and password.
    validateSuccessSignup() {
        // Check for generated user id should be visible.
        cy.get('.accpage').eq(0).siblings().should('be.visible');

        // Check for generated password should be visible.
        cy.get('.accpage').eq(1).siblings().should('be.visible');

        // Check for the warning message of account validity.
        cy.contains('valid only for 20 days').should('be.visible');

        return this;
    }

    // Validate signup page UI elements upon visiting.
    validateSignupPage() {
        // Check email input form.
        cy.get(`input[name="emailid"]`)
            .should('exist')
            .should('be.visible');
        
        // Check for the submit button.
        cy.get(`input[type="submit"]`)
            .should('be.visible')
            .should('be.enabled');

        return this;
    }
}

export default Signup;