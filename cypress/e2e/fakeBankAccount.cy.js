// cypress/integration/fakeBankAccount.spec.js

import { createFakeBankAccount } from '../../index.mjs';

describe('createFakeBankAccount', () => {
  it('should create a single fake bank account', () => {
    cy.intercept('POST', 'https://www.4devs.com.br/ferramentas_online.php', {
      statusCode: 200,
      body: {
        account_number: '12345',
        verification_digit: '6',
        agency: '7890',
        bank: 'Fake Bank',
      },
    }).as('fakeBankAccount');

    createFakeBankAccount().then((account) => {
      console.log('Conta Gerada:', account);
      expect(account).to.be.an('object');
      expect(account).to.have.property('account_number');
      expect(account).to.have.property('verification_digit');
      expect(account).to.have.property('agency');
      expect(account).to.have.property('bank');
    });
  });

  it('should create multiple fake bank accounts when quantity > 1', () => {
    const quantity = 3;
    cy.intercept(
      'POST',
      'https://www.4devs.com.br/ferramentas_online.php',
      (req) => {
        req.reply({
          statusCode: 200,
          body: Array(quantity).fill({
            account_number: '12345',
            verification_digit: '6',
            agency: '7890',
            bank: 'Fake Bank',
          }),
        });
      }
    ).as('fakeBankAccounts');

    createFakeBankAccount(quantity).then((accounts) => {
      expect(accounts).to.be.an('array').to.have.lengthOf(quantity);
      accounts.forEach((account) => {
        expect(account).to.be.an('object');
        expect(account).to.have.property('account_number');
        expect(account).to.have.property('verification_digit');
        expect(account).to.have.property('agency');
        expect(account).to.have.property('bank');
      });
    });
  });

  it('should limit the number of fake bank accounts created', () => {
    const quantity = 15;
    cy.intercept(
      'POST',
      'https://www.4devs.com.br/ferramentas_online.php',
      (req) => {
        req.reply({
          statusCode: 200,
          body: Array(10).fill({
            account_number: '12345',
            verification_digit: '6',
            agency: '7890',
            bank: 'Fake Bank',
          }),
        });
      }
    ).as('fakeBankAccounts');

    createFakeBankAccount(quantity).then((accounts) => {
      expect(accounts).to.be.an('array').to.have.lengthOf(10); // Limited to 10 accounts
    });
  });

  it('should handle server errors', () => {
    cy.intercept('POST', 'https://www.4devs.com.br/ferramentas_online.php', {
      statusCode: 500,
      body: 'Internal Server Error',
    }).as('fakeBankAccountsError');

    createFakeBankAccount().catch((error) => {
      expect(error).to.exist;
    });
  });

  it('should handle unexpected server responses', () => {
    cy.intercept('POST', 'https://www.4devs.com.br/ferramentas_online.php', {
      statusCode: 200,
      body: 'Invalid response format',
    }).as('fakeBankAccountsUnexpected');

    createFakeBankAccount().catch((error) => {
      expect(error).to.exist;
    });
  });
});
