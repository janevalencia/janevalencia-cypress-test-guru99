// Helper custom command to create random valid email and enter into an input selector.
Cypress.Commands.add('typeValidEmailToSelector', (selector) => {
    function createEmail() {
        const prefix = 'test';
        const domain = 'email.ghostinspector.com'
        let timestampms = Date.now();
        return `${prefix}_${timestampms}@${domain}`;
    }
    cy.get(selector).type(createEmail());
})