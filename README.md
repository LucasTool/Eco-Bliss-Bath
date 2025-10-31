# **EcoBlissBath**

EcoBlissBath est une jeune entreprise, spécialisée dans la distribution de cosmétiques écologiques. Notre produit phare est un savon solide respectueux de l'environnement.

## **Prérequis**

Avant de démarrer le projet, assurez-vous d'avoir installé les outils suivants :
- Docker
- Node.js
- NPM
- Cypress
- Un navigateur web moderne (Chrome ou Firefox recommandés)

## **Installation et lancement du projet**

### 1. Clonage du dépôt :

```bash
git clone https://github.com/OpenClassrooms-Student-Center/TesteurLogiciel_Automatisez_des_tests_pour_une_boutique_en_ligne.git
```

### 2. Démarrage du backend :

Ouvrez une fenêtre de terminal, puis :
- Naviguez vers le répertoire du projet cloné
- Exécutez la commande ci-dessous pour démarrer le backend :

```bash
docker-compose up
```

### 3. Démarrage du frontend :

Dans une nouvelle fenêtre de terminal :
- Accédez au dossier du projet cloné
- Lancez les commandes suivantes :

```bash
npm install
npm start
```

## **Mise en place des tests**

### 1. Installation de Cypress :

Ouvrez un terminal de commande et :
- Rendez-vous dans le répertoire du projet cloné
- Installez Cypress avec la commande suivante :

```bash
npm install cypress --save-dev
```

### 2. Ouverture de l'interface Cypress :

Dans le terminal, saisissez :

```bash
npx cypress open
```

## **Exécution des tests et création du rapport**

### 1. Lancement des tests avec génération de rapport :

- Ouvrez un nouveau terminal
- Placez-vous dans le répertoire du projet cloné
- Exécutez la commande suivante pour lancer les tests et générer automatiquement un rapport :

```bash
npx cypress run
```

## **Identifiants de connexion**

Identifiant : test2@test.fr  
Mot de passe : testtest

## **Documentation API**

Lien vers la documentation Swagger : http://localhost:8081/api/doc

## **Auteurs**

Lucas, Marie
