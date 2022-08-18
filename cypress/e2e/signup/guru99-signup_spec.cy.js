import Signup from "../../pages/Signup";
const signup = new Signup();

describe('TS_1: Verify Signup Page', () => {
    beforeEach('Navigate to signup page', () => {
        signup.start();
        signup.validateSignupPage();
    })

    it('User should not be able to signup for new account with empty email', () => {
        signup.validateEmptyEmail('Email ID must not be blank');
    })

    it('User should not be able to signup for new account with invalid email', () => {
        signup.validateInvalidEmail('mail', 'Email ID is not valid');
        signup.validateInvalidEmail('mail@email', 'Email ID is not valid');
    })

    it('User should be able to signup for new account with valid email address', () => {
        signup.signup();
        signup.validateSuccessSignup();
        cy.screenshot();
    })
})