import { test, expect } from '@playwright/test';

test('Ajouter un article aléatoire au panier et commander', async ({ page }) => {
  await page.goto('https://ztrain-web.vercel.app/home');

  // Récupérer tous les articles disponibles
  const products = await page.$$('img.style_card_body_img__mkV1D');
  expect(products.length).toBeGreaterThan(0);

  // Sélectionner un article aléatoire
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  await randomProduct.click();

  // Attendre que la page du produit s'affiche
  await page.waitForLoadState('networkidle');

  // Ajouter au panier
  await page.waitForSelector('button:has-text("Ajouter au panier")');
  await page.click('button:has-text("Ajouter au panier")');

  // Attendre la mise à jour du panier
  await page.waitForTimeout(1000);

  // Ouvrir le panier
  await page.waitForSelector('#style_content_cart_wrapper__mqNbf');
  await page.click('#style_content_cart_wrapper__mqNbf');

  // Vérifier que le pop-up du panier est visible
  await page.waitForSelector('.ant-drawer-body');

  // Cliquer sur le bouton "Commander"
  await page.waitForSelector('#style_btn_cart__zrT9Q');
  await page.click('#style_btn_cart__zrT9Q');

  // Vérifier si la pop-up de connexion s'affiche
  const popupConnexion = await page.locator('.ant-modal-content').isVisible();
  if (popupConnexion) {
    console.log('🔒 Pop-up de connexion détectée !');
  } else {
    // Vérifier si la pop-up de paiement apparaît
    await page.waitForSelector('.payment-modal-selector', { timeout: 5000 });
    console.log('💳 Pop-up de paiement affichée !');
  }

  // Attendre 5 secondes avant la fermeture
  await page.waitForTimeout(5000);
});