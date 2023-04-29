const website_url = 'https://museum-app-sandy.vercel.app/';

// Test cases for search home button
describe('Search home button', () => {
  it('should redirect unauthenticated user to login page', () => {
    cy.visit(website_url);
    cy.get('button.search-button').click();
    cy.url().should('eq', website_url + 'login');
  });

  it('should redirect authenticated user to search page', () => {
    cy.visit(website_url + 'login');
    cy.get('#userName').type('test-user');
    cy.get('#password').type('test');
    cy.get('form').submit();
    cy.url().should('eq', website_url + 'favourites');

    cy.visit(website_url);
    cy.get('.navbar-nav > :nth-child(1) > .nav-link').click();
    cy.get('button.search-button').click();
    cy.url().should('eq', website_url + 'search');
  });
});
