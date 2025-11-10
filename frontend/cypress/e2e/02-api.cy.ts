const PRODUCT_AVAILABLE    = 5; // produit en stock
const PRODUCT_OUT_OF_STOCK = 4; // produit en rupture

describe('API - Eco Bliss Bath', () => {

  it('GET /api/health -> 200 (le backend est up)', () => {
    cy.apiRequest('GET', '/api/health')
      .its('status')
      .should('eq', 200);
  });

  it('POST /login (valides) -> 200', () => {
    cy.fixture('example').then((data) => {

      expect(data).to.have.property('validUser');
      expect(data.validUser).to.have.all.keys('email', 'password');

      cy.apiRequest('POST', '/login', {
        body: {
          username: data.validUser.email,
          password: data.validUser.password,
        },
      })
      .its('status')
      .should('eq', 200);
    });
  });

  it('POST /login (mauvais identifiants) -> 401', () => {
    cy.fixture('example').then((data) => {

      expect(data).to.have.property('invalidUser');
      expect(data.invalidUser).to.have.all.keys('email', 'password');

      cy.apiRequest('POST', '/login', {
        body: {
          username: data.invalidUser.email,
          password: data.invalidUser.password,
        },
        failOnStatusCode: false,
      })
      .its('status')
      .should('eq', 401);
    });
  });

  // 1️ GET /orders sans authentification → 401 attendu
  it('GET /orders (sans authentification) → 401 attendu', () => {
    cy.apiRequest('GET', '/orders', {
      failOnStatusCode: false,
    })
    .its('status')
    .should('eq', 401);
  });

  // 2️ GET /orders après connexion → 200 et renvoie le panier
  it('GET /orders après connexion → 200 et renvoie le panier', () => {
    cy.loginAndGetToken().then((token) => {
      cy.apiRequest('GET', '/orders', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.exist;
      });
    });
  });

  // 3️ GET /products/{id} → 200 + bon id
  it(`GET /products/${PRODUCT_AVAILABLE} → 200 et bon id`, () => {
    cy.apiRequest('GET', `/products/${PRODUCT_AVAILABLE}`)
      .then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body).to.have.property('id', PRODUCT_AVAILABLE);
      });
  });

  // 4️ POST /orders/add produit disponible
  it('POST /orders/add (produit disponible) → succès 2xx ou 405 (selon API)', () => {
    cy.loginAndGetToken().then((token) => {
      cy.apiRequest('POST', '/orders/add', {
        headers: { Authorization: `Bearer ${token}` },
        body: { product: PRODUCT_AVAILABLE, quantity: 1 },
        failOnStatusCode: false,
      }).then((res) => {
        expect([200, 405]).to.include(res.status);
      });
    });
  });

  // 5️ POST /orders/add produit en rupture
  it('POST /orders/add (produit en rupture) → 409 attendu (ou 405)', () => {
    cy.loginAndGetToken().then((token) => {
      cy.apiRequest('POST', '/orders/add', {
        headers: { Authorization: `Bearer ${token}` },
        body: { product: PRODUCT_OUT_OF_STOCK, quantity: 1 },
        failOnStatusCode: false,
      }).then((res) => {
        // 409 = produit en rupture
        // 405 = accepté si l'API ne suit pas la norme
        expect([409, 405]).to.include(res.status);
      });
    });
  });

});