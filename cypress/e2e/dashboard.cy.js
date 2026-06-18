describe('Patient Dashboard', ()=>{
    beforeEach(() => {
        cy.visit('http://localhost:3000/dashboard.html')
    })

    it('should load the dashboard page', () => {
        cy.get('.navbar').should('be.visible')
        cy.get('h1').should('contain', 'MediCare Hospital')
    })

    it('should display appointment stats', () => {
        cy.get('#totalAppointments').should('be.visible')
        cy.get('#upcomingAppointments').should('be.visible')
        cy.get('#completedAppointments').should('be.visible')

    })
    it('should show correct stats numbers', () => {
    cy.get('#totalAppointments .stat-number').should('contain', '5')
    cy.get('#upcomingAppointments .stat-number').should('contain', '2')
    cy.get('#completedAppointments .stat-number').should('contain', '3')
  })

  it('should display appointments table', () => {
    cy.get('#appointmentsTable').should('be.visible')
  })

  it('should show correct number of appointment rows', () => {
    cy.get('.appointment-row').should('have.length', 3)
  })

  it('should show logout button', () => {
    cy.get('#logoutBtn').should('be.visible')
    cy.get('#logoutBtn').should('contain', 'Logout')
  })
})