import { test, expect } from '@playwright/test';

test('Ajouter un article aléatoire au panier et commander', async ({ page }) => {
  await page.goto('https://ztrain-web.vercel.app/home');

  // Récupérer tous les éléments d'articles (les images dans ce cas)
  const products = await page.$$('img.style_card_body_img__mkV1D');

  // Vérifier qu'il y a des produits disponibles
  expect(products.length).toBeGreaterThan(0);

  // Choisir un produit aléatoire
  const randomProduct = products[Math.floor(Math.random() * products.length)];

  // Cliquer sur l'image du produit choisi
  await randomProduct.click();

  // Attendre que la page du produit s'affiche
  await page.waitForLoadState('networkidle');

  // Cliquer sur le bouton "Ajouter au panier"
  await page.waitForSelector('button:has-text("Ajouter au panier")');
  await page.click('button:has-text("Ajouter au panier")');

  // Attendre un court instant pour la mise à jour du panier
  await page.waitForTimeout(1000);

  // Ouvrir le panier en cliquant sur son icône
  await page.waitForSelector('#style_content_cart_wrapper__mqNbf');
  await page.click('#style_content_cart_wrapper__mqNbf');

  // Vérifier que le pop-up du panier est visible
  await page.waitForSelector('.ant-drawer-body');

  // Cliquer sur le bouton "Commander"
  await page.waitForSelector('#style_btn_cart__zrT9Q');
  await page.click('#style_btn_cart__zrT9Q');

  // Vérifier si la pop-up de connexion s'affiche (cas d'un utilisateur non connecté)
  const popupConnexion = await page.locator('.ant-modal-content').isVisible();

  if (popupConnexion) {
    // Attendre que le champ email soit visible et le remplir
    await page.waitForSelector('#email_login');
    const email = 'loicfranceb@gmail.com'; // Remplacez par l'email souhaité
    await page.fill('#email_login', email);

    // Vérifier que le champ email est bien rempli
    expect(await page.inputValue('#email_login')).toBe(email);

    // Attendre que le champ mot de passe soit visible et le remplir
    await page.waitForSelector('#password_login');
    const password = 'Balo14723'; // Remplacez par le mot de passe souhaité
    await page.fill('#password_login', password);

    // Vérifier que le champ mot de passe est bien rempli
    expect(await page.inputValue('#password_login')).toBe(password);

    // Attendre que le bouton "Connexion" soit visible et le cliquer
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    // Attendre la fin du chargement et vérifier la connexion réussie
    await page.waitForLoadState('networkidle');
    console.log('Connexion réussie !');
    console.log('🔒 Pop-up de connexion détectée !');
  }

//   // Vérifier si la pop-up de paiement apparaît (pour un utilisateur connecté)
//   const popupPaiement = await page.locator('main#style_checkout_wrapper__JTsFz').isVisible();
  
//   if (popupPaiement) {
//     console.log('💳 Pop-up de paiement affichée !');
    
//     // Vous pouvez interagir avec la pop-up de paiement ici
//     await page.fill('#card-number', '4111111111111111'); // Exemple de numéro de carte
//     await page.fill('#card-expiry', '12/25');
//     await page.fill('#cvc', '123');
//     await page.fill('#zip', '75001'); // Code postal exemple
//     await page.fill('#style_input_address__CrN2C', 'Adresse de livraison'); // Exemple d'adresse

//     // Cliquer sur le bouton de validation
//     await page.click('#style_btnSubmit__sn_sg');
//   }

  // ❗ Pause pour voir le comportement
 // await page.pause();
});
