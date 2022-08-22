// Helper custom command to create random valid email and enter into an input selector.
Cypress.Commands.add('typeValidEmailToSelector', (selector) => {
    function createEmail() {
        const prefix    = 'test';
        const domain    = 'test.com'
        let timestampms = Date.now();
        return `${prefix}_${timestampms}@${domain}`;
    }
    cy.get(selector).type(createEmail());
})

Cypress.Commands.add('typeRandomString', (selector, length) => {
    function createRndString(length) {
        let randomString = '';
        let chars        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for ( var i = 0; i < length; i++ ) {
            randomString += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `Tester ${randomString}`;
    }

    cy.get(selector).type(createRndString(length));
})