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

// Test cases for login form
describe('Login form', () => {
  it('should log in successfully', () => {
    cy.visit(`${website_url}/login`);
    cy.get('#userName').type('test-user');
    cy.get('#password').type('test');
    cy.get('form').submit();
    cy.url().should('include', 'favourites');
  });

  it('should display an error message for wrong username', () => {
    cy.visit(`${website_url}/login`);
    cy.get('#userName').type('wrong-username');
    cy.get('#password').type('test');
    cy.get('form').submit();
    cy.get('div[role="alert"]').should(
      'contain',
      'Unable to find user wrong-username'
    );
  });

  it('should display an error message for wrong password', () => {
    cy.visit(`${website_url}/login`);
    cy.get('#userName').type('test-user');
    cy.get('#password').type('wrong-password');
    cy.get('form').submit();
    cy.get('div[role="alert"]').should(
      'contain',
      'Incorrect password for user test-user'
    );
  });
});

// Test cases for register form
describe('Register form', () => {
  const unique_username = `user${Math.random().toString(36).substring(7)}`;

  it('should register successfully', () => {
    cy.visit(`${website_url}/register`);
    cy.get('#userName').type(unique_username);
    cy.get('#password').type('test');
    cy.get('#confirmPassword').type('test');
    cy.get('form').submit();
    cy.url().should('include', 'login');
  });

  it('should display an error message for existing username', () => {
    cy.visit(`${website_url}/register`);
    cy.get('#userName').type('test-user');
    cy.get('#password').type('test');
    cy.get('#confirmPassword').type('test');
    cy.get('form').submit();
    cy.get('div[role="alert"]').should('contain', 'User Name already taken');
  });

  it('should display an error message for password mismatch', () => {
    cy.visit(`${website_url}/register`);
    cy.get('#userName').type(unique_username);
    cy.get('#password').type('test');
    cy.get('#confirmPassword').type('tes');
    cy.get('form').submit();
    cy.get('div[role="alert"]').should('contain', 'Passwords do not match');
  });
});

// // Test cases for navbar links
describe('Navbar links', () => {
  it('should navigate to register and login pages when unauthenticated', () => {
    cy.visit(website_url);

    // Test register button
    cy.get('a[href="/register"]').click();
    cy.url().should('include', 'register');

    // Test login button
    cy.get('a[href="/login"]').click();
    cy.url().should('include', 'login');

    // Test home button
    cy.get('a[href="/"]').click();
    cy.url().should('eq', website_url);
  });

  it('should navigate to search, favourites, history, and logout pages when authenticated', () => {
    cy.visit(`${website_url}/login`);
    cy.get('#userName').type('test-user');
    cy.get('#password').type('test');
    cy.get('form').submit();
    cy.url().should('include', 'favourites');

    cy.visit(website_url);

    // Test advanced search button
    cy.get('a[href="/search"]').click();
    cy.url().should('include', 'search');

    // Test quick search form
    cy.get('form input[type="search"]').type('king');
    cy.get('button.quick-search-button').click();
    cy.url().should('include', 'artwork?title=true&q=king');

    // Test dropdown menu
    cy.get('.dropdown-toggle').click();

    // Test favourites button in dropdown menu
    cy.get('a[href="/favourites"]').click();
    cy.url().should('include', 'favourites');

    // Test history button in dropdown menu
    cy.get('.dropdown-toggle').click();
    cy.get('a[href="/history"]').click();
    cy.url().should('include', 'history');

    // Test logout button in dropdown menu
    cy.get('.dropdown-toggle').click();
    cy.get('a[role="button"].dropdown-item').click();
    cy.url().should('include', 'login');
  });
});

describe('History', () => {
  it('should add and delete search history', () => {
    cy.visit(`${website_url}/login`);
    cy.get('#userName').type('test-user');
    cy.get('#password').type('test');
    cy.get('form').submit();
    cy.url().should('include', 'favourites');

    cy.visit(website_url);

    // Visit the history button by clicking on search history link in dropdown menu
    cy.get('.dropdown-toggle').click();
    cy.get('a[href="/history"]').click();
    cy.url().should('include', 'history');

    // Get initial number of history elements
    let initial_history_length = 0;
    cy.get('#__next > div > div > .list-group-item').then(
      (history_elements) => {
        initial_history_length = history_elements.length;
      }
    );
    cy.log(`Lenght: ${initial_history_length}`);

    cy.visit(website_url);

    // Search for dolphin using search bar
    cy.get('form input[type="search"]').type('dolphin');
    cy.get('form button[type="submit"]').click();
    cy.url().should('include', 'artwork?title=true&q=dolphin');

    // Visit the history button by clicking on search history link in dropdown menu
    cy.get('.dropdown-toggle').click();
    cy.get('a[href="/history"]').click();
    cy.url().should('include', 'history');

    // Check that history contains the dolphin search
    cy.get('#__next div div div:last-child').should('contain', 'dolphin');

    // delete 'dolphin' from history
    cy.get('#__next div div div:last-child button').click();

    // Wait for the history element to be deleted
    cy.get('#__next div div div:last-child').should('not.contain', 'dolphin');

    // Check that the history element is deleted
    cy.get('#__next > div > div > .list-group-item').then(
      (history_elements) => {
        expect(history_elements.length).to.equal(initial_history_length);
      }
    );
  });
});
