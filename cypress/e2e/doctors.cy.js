describe('Our Doctors Page', () => {

  // Our fake API data
  const mockDoctors = [
    { name: 'Dr. Ram Sharma', department: 'Cardiology', experience: '15 years experience' },
    { name: 'Dr. Sita Thapa', department: 'Neurology', experience: '12 years experience' },
    { name: 'Dr. Hari Poudel', department: 'General Medicine', experience: '10 years experience' },
    { name: 'Dr. Krishna KC', department: 'Orthopedic', experience: '8 years experience' },
    { name: 'Dr. Maya Gurung', department: 'Pediatrics', experience: '9 years experience' },
  ]

  beforeEach(() => {
    // Intercept the API call and return fake data
    cy.intercept('GET', '/api/doctors', {
      statusCode: 200,
      body: mockDoctors
    }).as('getDoctors')

    cy.visit('/doctors.html')

    // Wait for the API call to complete
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