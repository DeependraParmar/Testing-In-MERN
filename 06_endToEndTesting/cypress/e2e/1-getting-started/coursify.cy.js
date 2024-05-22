/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://coursify-frontend.vercel.app/')
    cy.wait(5000);
  })

  it('displays two todo items by default', () => {
    cy.contains('Login').should('exist');
    cy.wait(1000);
    cy.contains('Login').click();
    cy.wait(1000);
    cy.contains('Login').should('exist', { timeout: 10000 });
    cy.wait(1000);
  })
})
