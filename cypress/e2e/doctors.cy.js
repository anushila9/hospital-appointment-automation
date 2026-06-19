describe('Our Doctors Page', () => {
    beforeEach(() => {
        cy.visit('/doctors.html');
    })
    it('should load the doctors page successfully', () => {
        cy.get('.navbar').should('be.visible')
        cy.get('h2').should('contain', 'Our Doctors')
    })
    it('should contain doctors card', () => {
        cy.get('.doctor-card').should('have.length',5)
    })
    it('should filter by doctor name', () => {
        cy.get('#searchInput').type('ram')
        cy.get('.doctor-card').filter(':visible').should('have.length', 1)
    })
    it('should have a working search bar which searches based on departments', () => {
        cy.get('#searchInput').type('neurology')
        cy.get('.doctor-card').filter(':visible').should('have.length', 1)
    })
    it('should not show any cards for wrong searches', () => {
        cy.get('#searchInput').type('xyz')
        cy.get('.doctor-card').filter(':visible').should('have.length', 0)
    })
    
    it('should redirect the appointment button to appointment booking page', () => {
        cy.get('.book-btn').first().should('be.visible')
        cy.get('.book-btn').first().click()
        cy.url().should('include','appointments')
    })
    
})