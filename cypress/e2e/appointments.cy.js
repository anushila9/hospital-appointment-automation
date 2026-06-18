describe('Book Appointment Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/appointments.html');
    })
    it('should load the appointments page successfully', () => {
        cy.get('.navbar').should('be.visible')
        cy.get('h2').should('contain', 'Book an Appointment')
    })
    it('should contain the appointment dropdowns', () => {
        cy.get('#department').should('be.visible')
        cy.get('#doctor').should('be.visible')
        cy.get('#appointmentDate').should('be.visible')
        cy.get('#reason').should('be.visible')
    })
    it('should throw error when empty form is submitted', () => {
        cy.get('#bookBtn').click()
        cy.get('#formError').should('contain', 'Please fill in all fields.')
    })
    it('should throw error when partially filled form is submitted', () => {
        cy.get('#department').select('Cardiology')
        cy.get('#doctor').select('Dr. Ram Sharma (Cardiology)')
        cy.get('#bookBtn').click()
        cy.get('#formError').should('contain', 'Please fill in all fields.')
    })
    it('should fill the appointment form successfully', () => {
        cy.get('#department').select('Cardiology')
        cy.get('#doctor').select('Dr. Ram Sharma (Cardiology)')
        cy.get('#appointmentDate').type('2026-06-22')
        cy.get('#reason').type('Post surgery checkup')
        cy.get('#bookBtn').click()
        cy.get('#formSuccess').should('be.visible')
    })
    it('form should reset after successfully booking', () => {
        // Step 1 — fill the form
        cy.get('#department').select('Cardiology')
        cy.get('#doctor').select('Dr. Ram Sharma (Cardiology)')
        cy.get('#appointmentDate').type('2026-06-22')
        cy.get('#reason').type('Post surgery checkup')

        // Step 2 — submit it
        cy.get('#bookBtn').click()

        //Step 3 - submit it
        cy.get('#department').should('have.value', '')
        cy.get('#doctor').should('have.value', '')
        cy.get('#appointmentDate').should('have.value', '')
        cy.get('#reason').should('have.value', '')

    })
    it('should show logout button', () => {
        cy.get('#logoutBtn').should('be.visible')
        cy.get('#logoutBtn').should('contain', 'Logout')
    })
    it('should navigate to the dashboard', () => {
        cy.get('#dashboardLink').click();
        cy.url().should('include', 'dashboard')
    })

})