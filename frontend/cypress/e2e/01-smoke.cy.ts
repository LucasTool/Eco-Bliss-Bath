describe('Smoke - Eco Bliss Bath', () => {
  
  it('Login: la page de connexion affiche 2 champs et un bouton', () => {
      cy.visit('/');  //Page d'accueil

      cy.contains(/connexion|se connecter|login/i).click(); //  click sur le bouton de connexion

      cy.url().should('include', 'login'); // redirection sur la page de login

      cy.get('input').eq(0).should('exist'); //vérification que les champs de saisie sont présent
      cy.get('input').eq(1).should('exist');

      cy.contains(/connexion|se connecter|login/i).should('exist'); // vérification de présence du bouton se connecter
  });


  it('Catalogue/Fiche produits: boutons "ajouter au panier" + champ de disponibilité', () => {
      cy.visit('/');
      
      cy.contains(/consulter/i).first().click();

      cy.contains(/ajouter au panier/i).should('be.visible');
      cy.contains(/stock|disponible| en stock| disponibilité/i).should('be.visible');
  });

  it('Smoke XSS : vérifier qu\'aucune faille XSS ne s\'exécute', () => {
    const payload = `<img src=x onerror="alert('xss')">`;
 
    cy.visit('/');
    
  
    cy.contains(/connexion|se connecter|login/i).click();
    
    
    cy.get('input').eq(0).type('test2@test.fr');
    cy.get('input').eq(1).type('testtest{enter}');
    cy.wait(3000);
    
    
    cy.contains(/avis/i).click();
    cy.wait(2000);
    
    
    cy.get('[data-cy=review-input-title]').type('Test XSS');
    cy.get('[data-cy=review-input-comment]').type(payload); // injection du payload
    cy.get('[data-cy=review-input-rating-images] img').eq(4).click();
    cy.wait(500);
    
   
    cy.get('[data-cy=review-submit]').should('be.visible').click();
    cy.wait(3000);
    
    
    cy.get('[data-cy=review-comment] img[onerror]').should('not.exist');// vérification que aucune image avec atttribut "on error" n'est affiché
    cy.get('[data-cy=review-comment] script').should('not.exist');//vérification qu'aucune balise script n'est apparue
  });
});