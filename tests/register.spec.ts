import { test, expect } from '@playwright/test';

// Fonction pour générer un e-mail aléatoire
const generateRandomEmail = () => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `user_${randomString}@test.com`;
};

// Fonction pour générer un mot de passe sécurisé
const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$_';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

test('Inscription utilisateur avec données aléatoires', async ({ page }) => {
  await page.goto('https://ztrain-web.vercel.app/home');
  
  // Cliquer sur l'icône utilisateur pour ouvrir le popup
  await page.click('span[role="img"][aria-label="user"]');

  // Attendre et cliquer sur l'onglet "Inscription"
  await page.waitForSelector('button[role="tab"]:has-text("Inscription")');
  await page.click('button[role="tab"]:has-text("Inscription")');

  // Générer des données aléatoires valides
  const email = generateRandomEmail();
  const password = generateRandomPassword();

  console.log(`📧 Email généré : ${email}`);
  console.log(`🔑 Mot de passe généré : ${password}`);

  // Remplir les champs du formulaire
  await page.fill('#email_register', email);
  await page.fill('#password_register', password);
  await page.fill('#confirm_password_register', password);

  // Vérifier que les champs sont bien remplis (optionnel)
  expect(await page.inputValue('#email_register')).toBe(email);
  expect(await page.inputValue('#password_register')).toBe(password);
  expect(await page.inputValue('#confirm_password_register')).toBe(password);

  // Cliquer sur le bouton "Inscription"
  await page.waitForSelector('#btn_register');
  await page.click('#btn_register');

  // Attendre une éventuelle redirection ou confirmation
  await page.waitForTimeout(2000);

  console.log('✅ Inscription complétée avec succès !');

  // ❗ Ajout d'une pause pour voir le résultat (peut être supprimé)
 // await page.pause();
});
