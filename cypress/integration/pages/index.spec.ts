describe('/', () => {
  const SEARCH_INPUT = 'Stardew Valley';

  beforeEach(() => {
    cy.visit('/');
  });

  it('focuses search input on load', () => {
    cy.focused().should('have.id', 'searchInput');
  });

  it('accepts search input', () => {
    cy.get('#searchInput')
      .type(SEARCH_INPUT)
      .should('have.value', SEARCH_INPUT);
  });

  it('shows products after search form submission', () => {
    cy.intercept({ pathname: '/api/products' }).as('getProducts');

    cy.get('#searchInput').type(SEARCH_INPUT);

    cy.get('form').submit();

    cy.wait(['@getProducts']);

    cy.get('#searchResults > div').should('have.length.at.least', 1);
  });
});
