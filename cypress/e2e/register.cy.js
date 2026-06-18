describe('Registration Page', () => {
    beforeEach(() => {
        cy.visit('/register.html');
    })
    it('should load the register page successfully', () => {
        cy.get('.navbar').should('be.visible')
        cy.get('h2').should('contain', 'Create Patient Account')
    })
    it('should contain the registration form', () => {
        cy.get('#fullName').should('be.visible')
        cy.get('#email').should('be.visible')
        cy.get('#phone').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('#confirmPassword').should('be.visible')
        cy.get('#registerBtn').should('be.visible')
    })
    it('should throw error when empty form is submitted', () => {
        cy.get('#registerBtn').click()
        cy.get('#errorMessage').should('contain', 'Please fill in all fields.')
    })
    it('should throw error when partially filled form is submitted', () => {
        cy.get('#fullName').type('Test Name')
        cy.get('#registerBtn').click()
        cy.get('#errorMessage').should('contain', 'Please fill in all fields.')
    })
    it('should show error for short password', () => {
        cy.get('#fullName').type('Anushila Basnet')
        cy.get('#email').type('anushila@gmail.com')
        cy.get('#phone').type('9812345678')
        cy.get('#password').type('test')
        cy.get('#confirmPassword').type('test')
        cy.get('#registerBtn').click()
        cy.get('#errorMessage').should('contain', 'Password must be at least 6 characters.')
    })
    it('should show error for mismatched passwords', () => {
        cy.get('#fullName').type('Anushila Basnet')
        cy.get('#email').type('anushila@gmail.com')
        cy.get('#phone').type('9812345678')
        cy.get('#password').type('test@12345')
        cy.get('#confirmPassword').type('test')
        cy.get('#registerBtn').click()
        cy.get('#errorMessage').should('contain', 'Passwords do not match.')
    })
    it('should register successfully with valid credentials and redirect to login', () => {
        cy.get('#fullName').type('Anushila Basnet')
        cy.get('#email').type('anushila@gmail.com')
        cy.get('#phone').type('9812345678')
        cy.get('#password').type('test@12345')
        cy.get('#confirmPassword').type('test@12345')
        cy.get('#registerBtn').click()
        cy.get('#successMessage').should('be.visible')

        cy.url({ timeout: 5000 }).should('include', 'login')
    })
    it('should show login button', () => {
        cy.get('#loginLink').should('be.visible')
        cy.get('#loginLink').should('contain', 'Login')
    })
    
})