describe('Hospital Login Page', ()=> {
    beforeEach(() => {
        cy.visit('/login.html')
    })

    it('should load the login page', () => {
        cy.get('h2').should('contain', 'Patient Login');
    })

    it('should show error message for blank input in credentials section', () => {
        cy.get('#loginBtn').click()
        cy.get('#errorMessage').should('contain', 'Please fill in all fields.')
    })

    it('should show error for invalid message', () => {
        cy.fixture('user').then((user) => { 
        cy.get('#email').type('wrongemail@gmail.com')
        cy.get('#password').type('wrongpassword')
        cy.get('#loginBtn').click()
        cy.get('#errorMessage').should('contain', 'Invalid email or password')
    })
    })
    it('should login successfully with valid credentials', () => {
        cy.fixture('user').then((user) => { 
        cy.get('#email').type('patient@medicare.com')
        cy.get('#password').type('Test@1234')
        cy.get('#loginBtn').click()
        cy.url().should('include', 'dashboard')
    })
    })
})