import { Signin, AddCustomer } from "../../pages";
const signin = new Signin();
const addCustomer = new AddCustomer();

describe('TS_3a: Verify Add New Customer Form Submission', () => {
    beforeEach('Login and navigate to Add Customer page', () => {
        // Go to login page.
        signin.start();

        // Login as manager.
        cy.fixture('login').then((user) => {
            signin.signin(user.userID, user.password)
        })

        // Navigate to New Customer page.
        addCustomer.navigate();
    })

    // Ignore all uncaught exception thrown by the application.
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('User should be able to see the Add New Customer form.', () => {
        addCustomer.validateAddCustomerPage();
    })

    it('User should be able to submit Add New Customer form with all required information.', () => {
        cy.fixture('customer').then((customer) => {
            
            // Enter valid customer data.
            addCustomer.inputCustomerName();
            addCustomer.inputGender(customer.gender);
            addCustomer.inputDOB(customer.dob);
            addCustomer.inputAddress(customer.address.street);
            addCustomer.inputCity(customer.address.city);
            addCustomer.inputState(customer.address.state);
            addCustomer.inputPIN(customer.pin);
            addCustomer.inputMobile(customer.mobile);
            addCustomer.inputEmail();
            addCustomer.inputPassword(customer.password);

            // Execute form submission.
            addCustomer.runSubmit();

            // Validate newly created customer data.
            addCustomer.validateSubmittedCustomer();
        })
    })

    it('User should not be able to submit Add New Customer form without all required fields.', () => {
        addCustomer.runInvalidSubmission('please fill all fields');
    })
})

describe('TS_3b: Verify Add New Customer UI Form', () => {
    before('Login and navigate to Add Customer page', () => {
        // Go to login page.
        signin.start();

        // Login as manager.
        cy.fixture('login').then((user) => {
            signin.signin(user.userID, user.password)
        })

        // Navigate to New Customer page.
        addCustomer.navigate();
    })

    it('User should see input error message if customer name is invalid.', () => {
        addCustomer.validateEmptyCustomerName('Customer name must not be blank');
        addCustomer.validateInvalidCustomerName(' start with space', 'First character can not have space');
    })

    it('User should not be able to enter over 25 characters of customer name', () => {
        cy.fixture('customer').then((customer) => {
            addCustomer.validateCustomerNameLength(customer.nameOver25Chars)
        })
    })

    it('User should be able to select gender.', () => {
        addCustomer.inputGender(1);
        addCustomer.inputGender(0);
    })

    it('User should only be able to enter valid date (YYYY-MM-DD) into DOB input field.', () => {
        cy.fixture('customer').then((customer) => {
            addCustomer.validateValidDOB(customer.dob, 'Date Field must not be blank');
        })
    })

    it('User should see input error message if address is invalid.', () => {
        addCustomer.validateEmptyAddress('Address Field must not be blank');
        addCustomer.validateInvalidAddress(' start with space', 'First character can not have space');
    })

    it('User should not be able to enter over 50 characters of street address', () => {
        cy.fixture('customer').then((customer) => {
            addCustomer.validateAddressLength(customer.address.streetOver50len);
        })
    })

    it('User should see input error message if city is invalid.', () => {
        addCustomer.validateEmptyCity('City Field must not be blank');
        addCustomer.validateInvalidCity(' start with space', 'First character can not have space');
    })

    it('User should not be able to enter over 25 characters of city address', () => {
        cy.fixture('customer').then((customer) => {
            addCustomer.validateCityLength(customer.address.cityOver25len);
        })
    })

    it('User should see input error message if state is invalid.', () => {
        addCustomer.validateEmptyState('State must not be blank');
        addCustomer.validateInvalidState(' start with space', 'First character can not have space');
    })

    it('User should not be able to enter over 25 characters of state address', () => {
        cy.fixture('customer').then((customer) => {
            addCustomer.validateStateLength(customer.address.stateOver25len);
        })
    })

    it('User should see input error message if PIN number is invalid.', () => {
        addCustomer.validateEmptyPIN('PIN Code must not be blank');
        addCustomer.validateInvalidPIN(' ', 'First character can not have space');
        addCustomer.validateInvalidPIN('text', 'Characters are not allowed');
        addCustomer.validateInvalidPIN('1234', 'PIN Code must have 6 Digits');
    })

    it('User should not be able to enter over 6 characters of PIN', () => {
        cy.fixture('customer').then((customer) => {
            addCustomer.validatePINLength(customer.pinOver6len);
        })
    })

    it('User should see input error message if mobile number is invalid.', () => {
        addCustomer.validateEmptyMobile('Mobile no must not be blank');
        addCustomer.validateInvalidMobile(' space', 'First character can not have space');
        addCustomer.validateInvalidMobile('text', 'Characters are not allowed');
    })

    it('User should not be able to enter over 15 characters of mobile number', () => {
        cy.fixture('customer').then((customer) => {
            addCustomer.validateMobileLength(customer.mobileOver15len);
        })
    })

    it('User should see input error message if email is invalid.', () => {
        addCustomer.validateEmptyEmail('Email-ID must not be blank');
        addCustomer.validateInvalidEmail(' startwithspace', 'First character can not have space');
        addCustomer.validateInvalidEmail('test@awd.c', 'Email-ID is not valid');
    })

    it('User should not be able to enter over 30 characters of email', () => {
        cy.fixture('customer').then((customer) => {
            addCustomer.validateEmailLength(customer.emailOver30len);
        })
    })

    it('User should see input error message if password is empty.', () => {
        addCustomer.validateEmptyPassword('Password must not be blank');
    })
})