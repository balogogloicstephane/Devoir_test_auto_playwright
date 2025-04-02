import { test, expect } from '@playwright/test';

test('Ajouter un article au panier et commander', async ({ page }) => {
  await page.goto('https://ztrain-web.vercel.app/home');

  // Attendre que l'image de l'article soit visible et cliquer dessus
  await page.waitForSelector('img.style_card_body_img__mkV1D');
  await page.click('img.style_card_body_img__mkV1D');

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
    console.log('🔒 Pop-up de connexion détectée !');
  } else {
    // Vérifier si la pop-up de paiement apparaît
    await page.waitForSelector('.payment-modal-selector', { timeout: 5000 });
    console.log('💳 Pop-up de paiement affichée !');
  }
});

// Ajouter une pause de 5 secondes après le test avant la fermeture du navigateur
test.afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 5000));
});
