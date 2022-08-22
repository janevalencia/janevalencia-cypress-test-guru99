/// <reference types="Cypress" />
class AddCustomer {

    /**
     * Define form elements (wrapped in function).
     */
    constructor() {
        this.name = () => cy.get('input[name="name"]');
        this.gender = () => cy.get('input[type="radio"]');
        this.dob = () => cy.get('#dob');
        this.address = () => cy.get('textarea[name="addr"]');
        this.city = () => cy.get('input[name="city"]');
        this.state = () => cy.get('input[name="state"]');
        this.pin = () => cy.get('input[name="pinno"]');
        this.mobile = () => cy.get('input[name="telephoneno"]');
        this.email = () => cy.get('input[name="emailid"]');
        this.password = () => cy.get('input[name="password"]');
        this.submit = () => cy.get('input[type="submit"]');
        this.reset = () => cy.get('input[type="reset"]');
    }

    /**
     * Go to the Add Customer page from manager's navigation bar.
     */
    navigate() {
        cy.get('a[href="addcustomerpage.php"]').click();
    }

    /**
     * Execute valid form submission.
     */
     runSubmit() {
        // Click the submit form button.
        this.submit().click();

        // Check for success message.
        cy.contains('Customer Registered Successfully!!!').should('be.visible');

        // Check that URL has changed.
        cy.url().should('contain', 'CustomerRegMsg.php');
    }

    /**
     * Execute invalid form submission. 
     * 
     * @param {String} expectedAlertMsg 
     */
     runInvalidSubmission(expectedAlertMsg) {
        // Click on the submit button.
        this.submit().click();

        // Verify that a window:alert has open up requesting user to fill all fields.
        cy.on('window:alert', (prompt) => {
            expect(prompt).to.contains(expectedAlertMsg);
        })
    }

    /**
     * Enter (manual) or auto-generate (unique) the customer name.
     * 
     * @param {String} name 
     */
    inputCustomerName(name) {
        // Enter name into customer name input field (if name is provided).
        if (name) {
            this.name().type(name);
        }

        // Enter random-unique name into customer name input field.
        if (!name) {
            // Call cypress customer command.
            cy.typeRandomString('input[name="name"]', 5);
        }

        // Save the email being entered for further use.
        this.name().invoke('val').as('nameRegistered');

        // Validate that the input field now has that value.
        cy.get('@nameRegistered').then((data) => {
            const name = data;
            cy.get('input[name="name"]').should('have.value', name);
        })

        return this;
    }

    /**
     * Enter the customer gender.
     * 
     * @param {Number} option (0 (male) or 1(female))
     */
    inputGender(option) {
        // Click the gender option checkbox.
        this.gender().eq(option).click();
        
        // Verify the gender option selected is checked.
        this.gender().eq(option).should('be.checked');

        return this;
    }

    /**
     * Enter the DOB.
     * 
     * @param {String} dob (format: YYYY-MM-DD)
     */
    inputDOB(dob) {
        // Enter DOB (date of birth).
        this.dob().type(dob);

        // Validate that the input field now has that value.
        this.dob().should('have.value', dob);

        return this;
    }

    /**
     * Enter the address (street).
     * 
     * @param {String} street 
     */
    inputAddress(street) {
        // Enter street address.
        this.address().type(street);

        // Validate that the input field now has that value.
        this.address().should('have.value', street);

        return this;
    }

    /**
     * Enter the city.
     * 
     * @param {String} city 
     */
    inputCity(city) {
        // Enter city.
        this.city().type(city);

        // Validate that the input field now has that value.
        this.city().should('have.value', city);

        return this;
    }

    /**
     * Enter the state.
     * 
     * @param {String} state 
     */
    inputState(state) {
        // Enter state.
        this.state().type(state);

        // Validate that the input field now has that value.
        this.state().should('have.value', state);

        return this;
    }

    /**
     * Enter the PIN number.
     * 
     * @param {String} pin 
     */
    inputPIN(pin) {
        // Enter PIN.
        this.pin().type(pin);

        // Validate that the input field now has that value.
        this.pin().should('have.value', pin);

        return this;
    }

    /**
     * Enter the mobile number.
     * 
     * @param {String} mobile 
     */
    inputMobile(mobile) {
        // Enter mobile number.
        this.mobile().type(mobile);

        // Validate that the input field now has that value.
        this.mobile().should('have.value', mobile);

        return this;
    }

    /**
     * Enter (manual) or auto-generate (unique) the customer name.
     * 
     * @param {String} email 
     */
    inputEmail(email) {
        // Enter email manually if email is provided (not auto-generated).
        if (email) {
            this.email().type(email);
        }

        // Enter valid random-unique email.
        if (!email) {
            // Call custom cypress command.
            cy.typeValidEmailToSelector(`input[name="emailid"]`);
        }

        // Saved the email value here for further use.
        this.email().invoke('val').as('emailRegistered');
            
        // Validate that the input field now has that value.
        cy.get('@emailRegistered').then((data) => {
            const email = data;
            this.email().should('have.value', email);
        })

        return this;
    }

    /**
     * Enter the password.
     * 
     * @param {String} password 
     */
    inputPassword(password) {
        // Enter password into state input field.
        this.password().type(password);

        // Validate that the input field now has that value.
        this.password().should('have.value', password);

        return this;
    }

    /**
     * Validate the entered customer data matches with the submitted customer.
     */
    validateSubmittedCustomer() {
        // Verify CUSTOMER ID is created by the system.
        cy.contains('Customer ID').siblings().should('be.visible');

        // Verify CUSTOMER NAME matches with the entered customer data saved as @nameRegistered.
        cy.get('@nameRegistered').then((name) => {
            cy.get('td').contains('Customer Name').siblings().should('have.text', name);
        })

        cy.fixture('customer').then((customer) => {
            // Verify GENDER matches with the entered customer data (fixture).
            switch (customer.gender) {
                case 0:
                    cy.get('td').contains('Gender').siblings().should('have.text', 'male');
                    break;
                case 1:
                    cy.get('td').contains('Gender').siblings().should('have.text', 'female');
                    break;
            }

            // Verify DOB matches with the entered customer data (fixture).
            cy.get('td').contains('Birthdate').siblings().should('have.text', customer.dob);

            // Verify ADDRESS matches with the entered customer data (fixture).
            cy.get('td').contains('Address').siblings().should('have.text', customer.address.street);

            // Verify CITY matches with the entered customer data (fixture).
            cy.get('td').contains('City').siblings().should('have.text', customer.address.city);

            // Verify STATE matches with the entered customer data (fixture).
            cy.get('td').contains('State').siblings().should('have.text', customer.address.state);

            // Verify PIN matches with the entered customer data (fixture).
            cy.get('td').contains('Pin').siblings().should('have.text', customer.pin);

            // Verify MOBILE number matches with the entered customer data (fixture).
            cy.get('td').contains('Mobile No.').siblings().should('have.text', customer.mobile);
        })
        
        // Verify EMAIL matches with the entered customer data saved as @emailRegistered.
        cy.get('@emailRegistered').then((email) => {
            cy.get('td').contains('Email').siblings().should('have.text', email);
        })
    }

    /**
     * Validate UI elements on Add Customer page.
     */
    validateAddCustomerPage() {
        // Verify the form header.
        cy.get('.heading3').should('have.text', 'Add New Customer');

        // Verify input field for Customer Name.
        this.name()
            .should('exist')
            .should('be.visible');

        // Verify checkbox for Gender: Male.
        this.gender()
            .eq(0)
            .should('exist')
            .should('be.visible')
            .should('have.value', 'm')
            .should('be.checked');

        // Verify checkbox for Gender: Female.
        this.gender()
            .eq(1)
            .should('exist')
            .should('be.visible')
            .should('have.value', 'f');

        // Verify date input for DOB.
        this.dob()
            .should('exist')
            .should('be.visible');

        // Verify input field for Address.
        this.address()
            .should('exist')
            .should('be.visible');

        // Verify input field for City.
        this.city()
            .should('exist')
            .should('be.visible');

        // Verify input field for State.
        this.state()
            .should('exist')
            .should('be.visible');

        // Verify input field for PIN.
        this.pin()
            .should('exist')
            .should('be.visible');

        // Verify input field for Mobile Number.
        this.mobile()
            .should('exist')
            .should('be.visible');

        // Verify input field for Email.
        this.email()
            .should('exist')
            .should('be.visible');

        // Verify input field for Password.
        this.password()
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
        // Trigger backspace.
        this.name().type('{backspace}');

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
        // Enter invalid input.
        this.name().type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate the length of the entered customer name compared to the max limit of 25 chars.
     * 
     * @param {String} input (more than 25 characters)
     */
    validateCustomerNameLength(input) {
        const maxLength = 25;
        
        this.name().type(input);
        
        this.name().invoke('val').then(($value) => {
            // Validate the accepted value length to remain 25 characters.
            expect($value).to.has.length(maxLength);
        
            // Validate the accepted value is not equal to the actual input.
            expect($value).to.not.equal(input);
        })
    }

    /**
     * Validate invalid DOB (Date of Birth) input field. 
     * 
     * @param {String} validInput 
     * @returns Cypress assertion command chain.
     */
    validateValidDOB(validInput) {
        this.dob().type(validInput);

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
        // Trigger backspace.
        this.address().type('{backspace}');

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
        this.address().type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message3')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate the length of the entered address compared to the max limit of 50 chars.
     * 
     * @param {String} input (more than 50 characters)
     */
    validateAddressLength(input) {
        const maxLength = 50;
        
        this.address().type(input);
        
        this.address().invoke('val').then(($value) => {
            // Validate the accepted value length to remain 50 characters.
            expect($value).to.has.length(maxLength);
        
            // Validate the accepted value is not equal to the actual input.
            expect($value).to.not.equal(input);
        })
    }

    /**
     * Validate empty city input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyCity(expectedInputErrMsg) {
        // Trigger backspace.
        this.city().type('{backspace}');

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
        this.city().type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message4')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate the length of the entered city compared to the max limit of 25 chars.
     * 
     * @param {String} input (more than 25 characters)
     */
    validateCityLength(input) {
        const maxLength = 25;
        
        this.city().type(input);
        
        this.city().invoke('val').then(($value) => {
            // Validate the accepted value length to remain 25 characters.
            expect($value).to.has.length(maxLength);
        
            // Validate the accepted value is not equal to the actual input.
            expect($value).to.not.equal(input);
        })
    }

    /**
     * Validate empty State input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyState(expectedInputErrMsg) {
        // Trigger backspace.
        this.state().type('{backspace}');

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
        this.state().type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message5')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate the length of the entered state compared to the max limit of 25 chars.
     * 
     * @param {String} input (more than 25 characters)
     */
    validateStateLength(input) {
        const maxLength = 25;
        
        this.state().type(input);
        
        this.state().invoke('val').then(($value) => {
            // Validate the accepted value length to remain 25 characters.
            expect($value).to.has.length(maxLength);
        
            // Validate the accepted value is not equal to the actual input.
            expect($value).to.not.equal(input);
        })
    }

    /**
     * Validate empty PIN number input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyPIN(expectedInputErrMsg) {
        // Trigger backspace.
        this.pin().type('{backspace}');

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
        // Clear the form.
        this.reset().click();

        // Enter the pin.
        this.pin().type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message6')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate the length of the entered PIN compared to the max limit of 6 chars.
     * 
     * @param {String} input (more than 6 characters)
     */
     validatePINLength(input) {
        const maxLength = 6;
        
        this.pin().type(input);
        
        this.pin().invoke('val').then(($value) => {
            // Validate the accepted value length to remain 6 characters.
            expect($value).to.has.length(maxLength);
        
            // Validate the accepted value is not equal to the actual input.
            expect($value).to.not.equal(input);
        })
    }

    /**
     * Validate empty mobile number input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyMobile(expectedInputErrMsg) {
        // Trigger backspace.
        this.mobile().type('{backspace}');

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
        // Clear the form.
        this.reset().click();

        // Enter mobile number.
        this.mobile().type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message7')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate the length of the entered mobile number compared to the max limit of 15 chars.
     * 
     * @param {String} input (more than 15 characters)
     */
     validateMobileLength(input) {
        const maxLength = 15;
        
        this.mobile().type(input);
        
        this.mobile().invoke('val').then(($value) => {
            // Validate the accepted value length to remain 6 characters.
            expect($value).to.has.length(maxLength);
        
            // Validate the accepted value is not equal to the actual input.
            expect($value).to.not.equal(input);
        })
    }

    /**
     * Validate empty email input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyEmail(expectedInputErrMsg) {
        // Click signup button.
        this.email().type('{backspace}');

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
        // Clear form.
        this.reset().click();

        // Enter invalid input.
        this.email().type(invalidInput);

        // Check for invalid input message prompt.
        cy.get('#message9')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }

    /**
     * Validate the length of the entered email compared to the max limit of 30 chars.
     * 
     * @param {String} input (more than 30 characters)
     */
     validateEmailLength(input) {
        const maxLength = 30;
        
        this.email().type(input);
        
        this.email().invoke('val').then(($value) => {
            // Validate the accepted value length to remain 6 characters.
            expect($value).to.has.length(maxLength);
        
            // Validate the accepted value is not equal to the actual input.
            expect($value).to.not.equal(input);
        })
    }

    /**
     * Validate empty password input field. 
     * 
     * @param {String} expectedInputErrMsg 
     * @returns Cypress assertion command chain.
     */
    validateEmptyPassword(expectedInputErrMsg) {
        // Trigger backspace.
        this.password().type('{backspace}');

        // Check for invalid input message prompt.
        cy.get('#message18')
            .should('have.text', expectedInputErrMsg)
            .should('be.visible');

        return this;
    }
}

export default AddCustomer;