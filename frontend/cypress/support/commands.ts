declare global {
    namespace Cypress {
      interface Chainable {
        // Commande pour le login sur l'interface du site
        loginUI(): Chainable<any>;
        // pour se connecter via API et récupérer un token
        loginAndGetToken(): Chainable<any>;
        // pour faire des requêtes API sans répéter l'url complète
        apiRequest(method: string, path: string, options?: any): Chainable<any>;
      }
    }
  }
  
  //  URL de l'API définie une seule fois ici
  const API = Cypress.env('api') || 'http://localhost:8081';
  
  //  Commande pour faire des requêtes API sans répéter le lien
  Cypress.Commands.add('apiRequest', (method, path, options = {}) => {
    return cy.request({
      method, // GET, POST
      url: `${API}${path}`, // Url avec chemin
      ...options, // options comme header, body
    });
  });
  
  //  Commande pour se connecter via l'interface utilisateur
  Cypress.Commands.add('loginUI', () => {
    cy.visit('/'); // Page d'accueil
  
    cy.contains(/connexion|se connecter|login/i).click();
    cy.url().should('include', 'login');
  
    cy.fixture('example').then((data) => {
        // Je récupère l'email et le mot de passe depuis la fixture,
      
        const email = data?.validUser?.email || 'test2@test.fr';
        const password = data?.validUser?.password || 'testtest';
    
        cy.get('input').eq(0).type(email);
        cy.get('input').eq(1).type(password);
      cy.get('button').contains(/connexion|se connecter|login/i).click();
    });
  });
  
  //  Commande pour se connecter via l'API et récupérer un token
  Cypress.Commands.add('loginAndGetToken', () => {
    return cy.fixture('example').then((data) => {

        const email = data?.validUser?.email || 'test2@test.fr'
        const password = data?.validUser?.password || 'testtest'

      return cy
        .apiRequest('POST', '/login', {
          body: {
            username: email,
            password: password,
          },
        })
        .then((response) => {
          const token =
            response.body.token ||
            response.body.access_token ||
            response.body.jwt ||
            '';
  
          if (!token) throw new Error('Token non trouvé dans la réponse');
          return token;
        });
    });
  });
  
 
  export {};