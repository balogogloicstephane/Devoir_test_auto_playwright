import { test, expect } from '@playwright/test';

// Fonction pour générer un email unique
const generateRandomEmail = () => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `user_${randomString}@test.com`;
};

// Fonction pour générer un mot de passe sécurisé
const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$_';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

test('Inscription et connexion utilisateur', async ({ page }) => {
  await page.goto('https://ztrain-web.vercel.app/home');

  // Ouvrir le popup utilisateur
  await page.click('span[role="img"][aria-label="user"]');
  
  // Aller dans l'onglet "Inscription"
  await page.waitForSelector('button[role="tab"]:has-text("Inscription")');
  await page.click('button[role="tab"]:has-text("Inscription")');

  // Générer des identifiants aléatoires
  const email = generateRandomEmail();
  const password = generateRandomPassword();

  console.log(`📧 Email généré : ${email}`);
  console.log(`🔑 Mot de passe généré : ${password}`);

  // Remplir le formulaire d'inscription
  await page.fill('#email_register', email);
  await page.fill('#password_register', password);
  await page.fill('#confirm_password_register', password);

  // Cliquer sur "Inscription"
  await page.waitForSelector('#btn_register');
  await page.click('#btn_register');

  // Attendre une éventuelle redirection
  await page.waitForTimeout(2000);
  console.log('✅ Inscription réussie !');

  // ✅ **Se déconnecter (si nécessaire) et tester la connexion avec les identifiants créés**
  await page.reload();
  await page.click('span[role="img"][aria-label="user"]');

  // Aller dans l'onglet "Connexion"
  await page.waitForSelector('button[role="tab"]:has-text("Connexion")');
  await page.click('button[role="tab"]:has-text("Connexion")');

  // Remplir les champs avec les identifiants créés
  await page.fill('#email_login', email);
  await page.fill('#password_login', password);

  // Cliquer sur "Connexion"
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');

  // Vérifier si l'élément avec l'avatar et l'email est visible après la connexion
  await page.waitForLoadState('networkidle');
  console.log('Vérification de la connexion...');
  
  // Vérifier si le div avec l'avatar et l'email est visible
  const userAvatarWrapper = await page.locator('#style_avatar_wrapper__pEGIQ');
  const isUserConnected = await userAvatarWrapper.isVisible();

  // Vérifier que l'email est bien affiché
  const displayedEmail = await userAvatarWrapper.locator('p').textContent();
  expect(displayedEmail).toBe(email);  // Vérifie que l'email affiché est celui de l'utilisateur

  console.log('État de la connexion :', isUserConnected);
  expect(isUserConnected).toBeTruthy();  // Vérifie que l'élément de l'avatar est visible

  console.log('✅ Connexion réussie et utilisateur identifié sur la page d’accueil !');
});
