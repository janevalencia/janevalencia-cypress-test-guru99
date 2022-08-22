import { Signin } from "../../pages";
const signin = new Signin();

describe('TS_2: Verify Login Page [existing user]', () => {
    beforeEach('Navigate to login page', () => {
        signin.start();
        signin.validateLoginPage();
    })

    it('User should be able to login with an existing valid User ID & Password', () => {
        cy.fixture('login').then((user) => {
            signin.signin(user.userID, user.password)
        })
    })

    it('User should see the input error prompt for empty UserID & Password', () => {
        signin.validateEmptyUserID('User-ID must not be blank');
        signin.validateUserIDInputValue('');
        signin.validateEmptyPassword('Password must not be blank');
        signin.validatePwdInputValue('');
    })

    it('User should be able to reset the login form', () => {
        // Create a temporary user id and pwd.
        const userID = 'test';
        const pwd = 'password';

        // Fill userID and password into the form.
        signin.inputUserCreds(userID, pwd);

        // Assert that initially the input form should have the entered User ID.
        signin.validateUserIDInputValue(userID);

        // Assert that initially the input form should have the entered Password.
        signin.validatePwdInputValue(pwd);

        // Execute reset form.
        signin.validateResetForm();
    })
})