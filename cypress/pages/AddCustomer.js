/// <reference types="Cypress" />
class AddCustomer {
    /**
     * Go to the Add Customer page from manager's navigation bar.
     */
    navigate() {
        cy.get('a[href="addcustomerpage.php"]').click();
    }

    /**
     * Execute valid form submission.
     */
    submit() {
        // Click the submit form button.
        cy.get('input[type="submit"]').click();

        // Check for success message.
        cy.contains('Customer Registered Successfully!!!').should('be.visible');

        // Check that URL has changed.
        cy.url().should('contain', 'CustomerRegMsg.php');
        
    }

    /**
     * Enter the customer name.
     * 
     * @param {String} name 
     */
    inputCustomerName(name) {
        // Enter name into customer name input field (if name is provided).
        if (name) {
            cy.get('input[name="name"]').type(name);

            // Validate that the input field now has that value.
            cy.get('input[name="name"]').should('have.value', name);
        }

        // Enter random name into customer name input field.
        if (!name) {
            cy.typeRandomString('input[name="name"]', 5);
        
            // Saved the email being generated here for further use.
            cy.get('input[name="name"]').invoke('val').as('nameRegistered');
            
            // Validate that the input field now has that value.
            cy.get('@nameRegistered').then((data) => {
                const name = data;
                cy.get('input[name="name"]').should('have.value', name);
            })
        }
    }

    /**
     * Enter the customer gender option: 0 or 1.
     * 
     * @param {Number} option (0 (male) or 1(female))
     */
    inputGender(option) {
        // Click the gender option checkbox.
        cy.get('input[type="radio"]')
            .eq(option)
            .click();
        
        // Verify the gender option selected is checked.
        cy.get('input[type="radio"]')
            .eq(option)
            .should('be.checked');

        return this;
    }

    /**
     * Enter the DOB.
     * 
     * @param {String} dob 
     */
    inputDOB(dob) {
        // Enter name into DOB input field.
        cy.get('#dob').type(dob);

        // Validate that the input field now has that value.
        cy.get('#dob').should('have.value', dob);

        return this;
    }

    /**
     * Enter the address (street).
     * 
     * @param {String} street 
     */
    inputAddress(street) {
        // Enter name into address input field.
        cy.get('textarea[name="addr"]').type(street);

        // Validate that the input field now has that value.
        cy.get('textarea[name="addr"]').should('have.value', street);

        return this;
    }

    /**
     * Enter the address (city).
     * 
     * @param {String} city 
     */
    inputCity(city) {
        // Enter name into address input field.
        cy.get('input[name="city"]').type(city);

        // Validate that the input field now has that value.
        cy.get('input[name="city"]').should('have.value', city);

        return this;
    }

    /**
     * Enter the address (state).
     * 
     * @param {String} state 
     */
    inputState(state) {
        // Enter name into state input field.
        cy.get('input[name="state"]').type(state);

        // Validate that the input field now has that value.
        cy.get('input[name="state"]').should('have.value', state);

        return this;
    }

    /**
     * Enter the PIN number.
     * 
     * @param {String} pin 
     */
    inputPIN(pin) {
        // Enter name into state input field.
        cy.get('input[name="pinno"]').type(pin);

        // Validate that the input field now has that value.
        cy.get('input[name="pinno"]').should('have.value', pin);

        return this;
    }

    /**
     * Enter the mobile number.
     * 
     * @param {String} mobile 
     */
    inputMobile(mobile) {
        // Enter name into state input field.
        cy.get('input[name="telephoneno"]').type(mobile);

        // Validate that the input field now has that value.
        cy.get('input[name="telephoneno"]').should('have.value', mobile);

        return this;
    }

    /**
     * Enter the email.
     * 
     * @param {String} email 
     */
    inputEmail(email) {
        if (email) {
            // Enter name into state input field.
            cy.get('input[name="emailid"]').type(email);
            cy.get('input[name="emailid"]').should('have.value', email);
        }

        if (!email) {
            // Enter valid email using custom Cypress command (/support/commands.js) to create random valid email.
            cy.typeValidEmailToSelector(`input[name="emailid"]`);
            
            // Saved the email being generated here for further use.
            cy.get('input[name="emailid"]').invoke('val').as('emailRegistered');
            
            // Validate that the input field now has that value.
            cy.get('@emailRegistered').then((data) => {
                const email = data;
                cy.get('input[name="emailid"]').should('have.value', email);
            })
        }

        return this;
    }

    /**
     * Enter the password.
     * 
     * @param {String} password 
     */
    inputPassword(password) {
        // Enter name into state input field.
        cy.get('input[name="password"]').type(password);

        // Validate that the input field now has that value.
        cy.get('input[name="password"]').should('have.value', password);

        return this;
    }

    /**
     * Execute invalid form submission. 
     * 
     * @param {String} expectedAlertMsg 
     */
    invalidSubmission(expectedAlertMsg) {
        // Click on the submit button.
        cy.get('input[type="submit"]').click();

        // Verify that a window:alert has open up requesting user to fill all fields.
        cy.on('window:alert', (prompt) => {
            expect(prompt).to.contains(expectedAlertMsg);
        })
    }

    /**
     * Validate the entered customer data matches with the submitted customer.
     * 
     */
    validateSubmittedCustomer() {
        // Check for created Customer ID.
        cy.contains('Customer ID').siblings().should('be.visible');

        // Verify customer name matches with the entered customer data saved as @nameRegistered.
        cy.get('@nameRegistered').then((data) => {
            const name = data;
            cy.get('td').contains('Customer Name').siblings().should('have.text', name);
        })

        cy.fixture('customer').then((customer) => {
            // Verify gender matches with the entered customer data (fixture).
            // Considering a switch here instead (refactor later).
            if (customer.gender === 0) {
                cy.get('td').contains('Gender').siblings().should('have.text', 'male');
            }

            if (customer.gender === 1) {
                cy.get('td').contains('Gender').siblings().should('have.text', 'female');
            }

            // Verify DOB matches with the entered customer data (fixture).
            cy.get('td').contains('Birthdate').siblings().should('have.text', customer.dob);

            // Verify address matches with the entered customer data (fixture).
            cy.get('td').contains('Address').siblings().should('have.text', customer.address.street);

            // Verify city matches with the entered customer data (fixture).
            cy.get('td').contains('City').siblings().should('have.text', customer.address.city);

            // Verify state matches with the entered customer data (fixture).
            cy.get('td').contains('State').siblings().should('have.text', customer.address.state);

            // Verify PIN matches with the entered customer data (fixture).
            cy.get('td').contains('Pin').siblings().should('have.text', customer.pin);

            // Verify mobiole number matches with the entered customer data (fixture).
            cy.get('td').contains('Mobile No.').siblings().should('have.text', customer.mobile);
        })
        
        // Verify email matches with the entered customer data saved as @emailRegistered.
        cy.get('@emailRegistered').then((data) => {
            const email = data;
            cy.get('td').contains('Email').siblings().should('have.text', email);
        })
    }

    /**
     * Validate UI elements on Add Customer page visible and exist.
     */
    validateAddCustomerPage() {
        // Verify the form header.
        cy.get('.heading3').should('have.text', 'Add New Customer');

        // Verify input field for Customer Name.
        cy.get('input[name="name"]')
            .should('exist')
            .should('be.visible');

        // Verify checkbox for Gender.
        cy.get('input[type="radio"]')
            .eq(0)
            .should('exist')
            .should('be.visible')
            .should('have.value', 'm')
            .should('be.checked');

        cy.get('input[type="radio"]')
            .eq(1)
            .should('exist')
            .should('be.visible')
            .should('have.value', 'f');

        // Verify date field for DOB (Date of Birth).
        cy.get('#dob')
            .should('exist')
            .should('be.visible');

        // Verify input field for Address.
        cy.get('textarea[name="addr"]')
            .should('exist')
            .should('be.visible');

        // Verify input field for City.
        cy.get('input[name="city"]')
            .should('exist')
            .should('be.visible');

        // Verify input field for State.
        cy.get('input[name="state"]')
            .should('exist')
            .should('be.visible');

        // Verify input field for PIN.
        cy.get('input[name="pinno"]')
            .should('exist')
            .should('be.visible');

        // Verify input field for Mobile Number.
        cy.get('input[name="telephoneno"]')
            .should('exist')
            .should('be.visible');

        // Verify input field for Email.
        cy.get('input[name="emailid"]')
            .should('exist')
            .should('be.visible');

        // Verify input field for Password.
        cy.get('input[name="password"]')
            .should('exist')
            .should('be.visible');
    }

    /**
     * Validate empty customer name input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyCustomerName(expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="name"]').type('{backspace}');

        // Check for invalid input message prompt.
        cy.get('#message')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate entering invalid customer name (for example: name starts with space).
     * 
     * @param {String} invalidInput 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateInvalidCustomerName(invalidInput, expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="name"]').type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate the length of the entered customer name compared to the max limit of 25 chars.
     * @param {String} input 
     */
    validateCustomerNameLength(input) {
        const maxLength = 25;

        if (input.length > 25) {
            // Enter the input value.
            cy.get('input[name="name"]').type(input);
        
            cy.get('input[name="name"]').invoke('val').then(($value) => {
                // Validate the accepted value length to remain 25 characters.
                expect($value).to.has.length(maxLength);

                // Validate the accepted value is not equal to the actual input.
                expect($value).to.not.equal(input);
            })
        }
    }

    /**
     * Validate invalid DOB (Date of Birth) input field. 
     * 
     * @param {String} validInput 
     * @returns Cypress assertion command chain.
     */
    validateValidDOB(validInput) {
        // Click signup button.
        cy.get('#dob').type(validInput);

        // Check error prompt should not be visible.
        cy.get('#message24').should('not.be.visible');

        return this;
    }

    /**
     * Validate empty address input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyAddress(expectedInputErrMsg) {
        // Click signup button.
        cy.get('textarea[name="addr"]').type('{backspace}');

        // Check for invalid input message prompt.
        cy.get('#message3')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate entering invalid address (for example: address starts with space).
     * 
     * @param {String} invalidInput 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateInvalidAddress(invalidInput, expectedInputErrMsg) {
        // Click signup button.
        cy.get('textarea[name="addr"]').type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message3')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate empty City input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyCity(expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="city"]').type('{backspace}');

        // Check for invalid input message prompt.
        cy.get('#message4')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate entering invalid city (for example: city starts with space).
     * 
     * @param {String} invalidInput 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateInvalidCity(invalidInput, expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="city"]').type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message4')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate empty State input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyState(expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="state"]').type('{backspace}');

        // Check for invalid input message prompt.
        cy.get('#message5')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate entering invalid State (for example: state starts with space).
     * 
     * @param {String} invalidInput 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateInvalidState(invalidInput, expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="state"]').type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message5')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate empty PIN number input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyPIN(expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="pinno"]').type('{backspace}');

        // Check for invalid input message prompt.
        cy.get('#message6')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate entering invalid PIN number (for example: pin number starts with space).
     * 
     * @param {String} invalidInput 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateInvalidPIN(invalidInput, expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="pinno"]').type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message6')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate empty mobile number input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyMobile(expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="telephoneno"]').type('{backspace}');

        // Check for invalid input message prompt.
        cy.get('#message7')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate entering invalid mobile number (for example: mobile no. starts with space).
     * 
     * @param {String} invalidInput 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateInvalidMobile(invalidInput, expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="telephoneno"]').type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message7')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate empty email input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyEmail(expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="emailid"]').type('{backspace}');

        // Check for invalid input message prompt.
        cy.get('#message9')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate entering invalid email (for example: email starts with space).
     * 
     * @param {String} invalidInput 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateInvalidEmail(invalidInput, expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="emailid"]').type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message9')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate empty password input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyPassword(expectedInputErrMsg) {
        // Click signup button.
        cy.get('input[name="password"]').type('{backspace}');

        // Check for invalid input message prompt.
        cy.get('#message18')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }
}

export default AddCustomer;