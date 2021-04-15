describe('/', () => {
  const SEARCH_INPUT = 'Stardew Valley';

  beforeEach(() => {
    cy.visit('/');

    cy.intercept(
      { pathname: '/api/products' },
      { fixture: 'products.json' }
    ).as('getProducts');
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
    cy.get('#searchInput').type(SEARCH_INPUT);

    cy.get('form').submit();

    cy.wait(['@getProducts']);

    cy.get('#searchResults > div').should('have.length.at.least', 1);
  });

  it('can navigate to product page from search result', () => {
    cy.get('#searchInput').type(SEARCH_INPUT);

    cy.get('form').submit();

    cy.wait(['@getProducts']);

    cy.get('#searchResults > div').should('have.length.at.least', 1);

    cy.get('#searchResult-0').click();

    cy.location('pathname').should('match', /(\/product\/)([0-9]*)/);
  });
});
