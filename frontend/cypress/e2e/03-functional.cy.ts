describe('Tests fonctionnels - Eco Bliss Bath', () => {


    

    it('Connexion: l\'utilisateur peut se connecter', () => {
      cy.visit('/');
  
      cy.contains(/connexion|se connecter|login/i).click();
  
      cy.url().should('include', 'login');
  
      cy.get('input').eq(0).type('test2@test.fr');
      cy.get('input').eq(1).type('testtest');
  
      cy.get('button').contains(/connexion|se connecter|login/i).click();
  
      cy.wait(2000);
  
      cy.visit('/');
  
      cy.contains(/panier|deconnexion|profil/i, {timeout: 8000}).should('exist');
    });
  
    it('Présence du champ de disponibilité et du bouton "Ajouter au panier"', () => {
      // On réutilise la commande personnalisée pour le login
      cy.loginUI();
  
      cy.visit('/');
  
      cy.contains(/voir les produits|consulter/i, {timeout: 10000}).first().click();
  
      cy.url().should('include', 'products');
  
      cy.contains(/consulter|voir le produit/i).first().click();
      cy.url().should('include', 'product');
  
      cy.contains(/stock|disponibilité/i, {timeout: 10000}).should('exist');
      cy.contains(/ajouter au panier/i).should('exist');
    });
  
    it('Ajouter un produit, vérifier le panier, revenir et vérifier stock', () => {
      // Connexion via la commande personnalisée
      cy.loginUI();
      cy.wait(2000);
    
      // Aller sur la page produit
      cy.visit('/#/products/5');
      cy.wait(1000);
    
      // Voir le stock avant
      cy.contains(/stock|disponibilite/i).invoke('text').then((txt) => {
        const stockAvant = txt.match(/\d+/)[0];
        cy.log('Stock avant: ' + stockAvant);
    
        // Ajouter au panier
        cy.contains(/ajouter au panier/i).click();
        cy.wait(2000);
    
        // Retourner sur la page produit
        cy.visit('/#/products/5');
        cy.wait(2000);
    
        // Voir le stock après
        cy.contains(/stock|disponibilite/i).invoke('text').then((txt2) => {
          const stockAprès = txt2.match(/\d+/)[0];
          cy.log('Stock après: ' + stockAprès);
          
          // ✅ Vérifier que le stock a changé (sans préciser s'il augmente ou diminue)
          expect(stockAprès).to.not.equal(stockAvant);
        });
      });
    });
  });