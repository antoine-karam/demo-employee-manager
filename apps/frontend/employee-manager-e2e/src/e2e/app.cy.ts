import { getHomeGreetings } from '../support/app.po';

describe('employee-manager-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getHomeGreetings().contains(/Welcome/);
  });
});
