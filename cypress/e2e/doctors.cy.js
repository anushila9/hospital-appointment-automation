describe('Our Doctors Page', () => {

  beforeEach(() => {
    cy.fixture('doctors').then((doctors) => {
      cy.intercept('GET', '/api/doctors', {
        statusCode: 200,
        body: doctors
      }).as('getDoctors')
    })

    cy.visit('/doctors.html')
    cy.wait('@getDoctors')
  })

  it('should load the doctors page successfully', () => {
    cy.get('.navbar').should('be.visible')
    cy.get('h2').should('contain', 'Our Doctors')
  })

  it('should display all doctors from API', () => {
    cy.get('.doctor-card').should('have.length', 5)
  })

  it('should filter by doctor name', () => {
    cy.get('#searchInput').type('ram')
    cy.get('.doctor-card').filter(':visible').should('have.length', 1)
  })

  it('should filter by department', () => {
    cy.get('#searchInput').type('neurology')
    cy.get('.doctor-card').filter(':visible').should('have.length', 1)
  })

  it('should show no results for invalid search', () => {
    cy.get('#searchInput').type('xyz')
    cy.get('.doctor-card').filter(':visible').should('have.length', 0)
  })

  it('should redirect to appointments on book button click', () => {
    cy.get('.book-btn').first().click()
    cy.url().should('include', 'appointments')
  })

  it('should show error message when API fails', () => {
    cy.intercept('GET', '/api/doctors', {
      statusCode: 500,
      body: {}
    }).as('getDoctorsFail')

    cy.visit('/doctors.html')
    cy.wait('@getDoctorsFail')
    cy.get('#errorMsg').should('contain', 'Failed to load doctors')
  })

})