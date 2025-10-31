describe('Tests fonctionnels - Eco Bliss Bath', () =>{

    it('Connexion: lutilisateur peut se connecter', () => {
        cy.visit('/');

        cy.contains(/connexion|se connecter|login/i).click();

        cy.url().should('include', 'login');

        cy.get('input').eq(0).type('test2@test.fr');
        cy.get('input').eq(1).type('testtest');

        cy.get('button').contains(/connexion|se connecter|login/i).click();

        cy.wait(2000);

        cy.visit('/')

        cy.contains(/panier|deconnexion|profil/i, {timeout: 8000}).should('exist');
    });

   it('Présence du champ de disponibilité et du bouton "Ajouter au panier"', () => {
       cy.visit('/');

       cy.contains(/connexion|se connecter|login/i).click();

       cy.url().should('include', 'login');
       cy.get('input').eq(0).type('test2@test.fr');
       cy.get('input').eq(1).type('testtest');
       cy.get('button').contains(/connexion|se connecter|login/i).click();

       cy.visit('/');

       cy.contains(/voir les produits|consulter/i, {timeout: 10000}).first().click();

       cy.url().should('include', 'products');

       cy.contains(/consulter|voir le produit/i).first().click();
       cy.url().should('include', 'product');


       cy.contains(/stock|disponibilité/i, {timeout: 10000}).should('exist');
       cy.contains(/ajouter au panier/i).should('exist');
   });

   it('Ajouter un produit, vérifier le panier, revenir et vérifier stock', () => {
       cy.visit('/');
       cy.contains(/connexion|se connecter|login/i).click();
       cy.url().should('include', 'login');
       cy.get('input').eq(0).type('test2@test.fr');
       cy.get('input').eq(1).type('testtest');
       cy.get('button').contains(/connexion|se connecter|login/i).click();

       cy.wait(2000);

       cy.visit('/');
       cy.contains(/panier|profil|deconnexion/i).should('exist');

       cy.visit('/#/products/5');
       cy.url().should('match', /#\/products\/\d+$/); // "d" veut dire chiffre et "+" veut dire un ou plusieurs

       cy.wait(1000);


       cy.contains(/stock|disponibilite/i).invoke('text').then((txt) =>{
        const m = txt.match(/\d+/); //Ici on extrait un nombre
        const stockAvant = Number(m?.[0] || 0); // Et la il est converti en number ou à 0 si rien trouvé
        expect(stockAvant).to.be.greaterThan(0);

        cy.contains(/ajouter au panier/i).should('be.visible').click();

        cy.contains(/panier/i).click({force: true});

        cy.url().should('include', 'cart');
        cy.contains(/total|commande|valider/i).should('exist');

      cy.go('back')

        cy.contains(/stock|disponibilite/i).invoke('text').then((txt2) =>{
            const m2 = txt2.match(/\d+/);
            const stockAprès = Number(m2?.[0] || 0);
            expect(stockAprès).to.eq(stockAvant -1);
        })
       })

   });
})