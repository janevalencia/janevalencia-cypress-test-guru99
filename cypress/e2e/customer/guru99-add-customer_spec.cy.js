import { Signin, AddCustomer } from "../../pages";
const signin = new Signin();
const addCustomer = new AddCustomer();

describe('TS_3a: Verify Add Customer function', () => {
    beforeEach('Login and navigate to Add Customer page', () => {
        signin.start();
        cy.fixture('login').then((user) => {
            signin.signin(user.userID, user.password)
        })
        addCustomer.navigate();
    })

    // Ignore all uncaught exception by the application itself.
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('User should be able to add new customer with all valid information entered', () => {
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
            addCustomer.submit();

            // Validate newly created customer data.
            addCustomer.validateSubmittedCustomer();
        })
    })
})

describe('TS_3b: Verify Add Customer UI Form', () => {
    before('Login and navigate to Add Customer page', () => {
        signin.start();
        cy.fixture('login').then((user) => {
            signin.signin(user.userID, user.password)
        })
        addCustomer.navigate();
    })

    it('User should be able to see the Add New Customer form.', () => {
        addCustomer.validateAddCustomerPage();
    })

    it('User should see input error message if customer name is invalid.', () => {
        addCustomer.validateEmptyCustomerName('Customer name must not be blank');
        addCustomer.validateInvalidCustomerName(' start with space', 'First character can not have space');
        cy.fixture('customer').then((customer) => {
            addCustomer.validateCustomerNameLength(customer.nameOver25Chars)
        })
    })

    it('User should be able to change the default M gender.', () => {
        // Select 'female' for gender.
        addCustomer.inputGender(1);

        // Select 'male' for gender.
        addCustomer.inputGender(0);
    })

    it('User should only able to enter valid date into DOB input field.', () => {
        cy.fixture('customer').then((customer) => {
            addCustomer.validateValidDOB(customer.dob, 'Date Field must not be blank');
        })
    })

    it('User should see input error message if address is invalid.', () => {
        addCustomer.validateEmptyAddress('Address Field must not be blank');
        addCustomer.validateInvalidAddress(' start with space', 'First character can not have space');
        // length test case
    })

    it('User should see input error message if city is invalid.', () => {
        addCustomer.validateEmptyCity('City Field must not be blank');
        addCustomer.validateInvalidCity(' start with space', 'First character can not have space');
        // length test case
    })

    it('User should see input error message if state is invalid.', () => {
        addCustomer.validateEmptyState('State must not be blank');
        addCustomer.validateInvalidState(' start with space', 'First character can not have space');
        // length test case
    })

    it('User should see input error message if PIN number is invalid.', () => {
        addCustomer.validateEmptyPIN('PIN Code must not be blank');
        addCustomer.validateInvalidPIN(' ', 'First character can not have space');

        // Clear the form.
        cy.get('input[type="reset"]').click();

        addCustomer.validateInvalidPIN('text', 'Characters are not allowed');

        // Clear the form.
        cy.get('input[type="reset"]').click();

        addCustomer.validateInvalidPIN('1234', 'PIN Code must have 6 Digits');
        
        // length test case
    })

    it('User should see input error message if mobile number is invalid.', () => {
        // Validate empty mobile number.
        addCustomer.validateEmptyMobile('Mobile no must not be blank');
        
        // Validate enter space into mobile number.
        addCustomer.validateInvalidMobile(' space', 'First character can not have space');
        
        // Clear the form.
        cy.get('input[type="reset"]').click();
        
        // Validate entering string into mobile number.
        addCustomer.validateInvalidMobile('text', 'Characters are not allowed');
        
        // length test case
    })

    it('User should see input error message if email is invalid.', () => {
        addCustomer.validateEmptyEmail('Email-ID must not be blank');
        addCustomer.validateInvalidEmail(' startwithspace', 'First character can not have space');
        // length test case
    })

    it('User should see input error message if password is empty.', () => {
        addCustomer.validateEmptyPassword('Password must not be blank');
    })

    it('User should not be able to submit new customer without filling all required fields.', () => {
        addCustomer.invalidSubmission('please fill all fields');
    })
})