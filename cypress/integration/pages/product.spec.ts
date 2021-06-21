describe('/product/:id', () => {
  const INITIAL_PRODUCT_ID = '23613';
  const PLATFORM_PILL_ID = '23666';

  it('platform pills navigate to the respective product page', () => {
    // navigate to initial product page
    cy.visit(`/product/${INITIAL_PRODUCT_ID}`);

    cy.get('[data-cy=title]').contains('Battlefield 5');

    // navigate via platform pill link
    cy.get(`a[data-cy=${PLATFORM_PILL_ID}]`).click();
    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      `/product/${PLATFORM_PILL_ID}`
    );

    cy.get('[data-cy=title]').contains('Battlefield 5 PS4');
  });

  /**
   * Next.js bug where page state is not reset - https://github.com/vercel/next.js/issues/9992
   */
  it('should not transfer filter checkbox state when changing platform', () => {
    // navigate to initial product page
    cy.visit(`/product/${INITIAL_PRODUCT_ID}`);

    // all checkbox inputs should be checked by default
    // "be.checked" assertion wont work, so check for existence of "checked" attr
    cy.get('input[type="checkbox"]').should('have.attr', 'checked');

    // navigate via platform pill link
    cy.get(`a[data-cy=${PLATFORM_PILL_ID}]`).click();
    cy.location('pathname', { timeout: 20000 }).should(
      'include',
      `/product/${PLATFORM_PILL_ID}`
    );

    // checkbox state should not be carried over, all inputs should still be selected
    // "be.checked" assertion wont work, so check for existence of "checked" attr
    cy.get('input[type="checkbox"]').should('have.attr', 'checked');
  });
});
