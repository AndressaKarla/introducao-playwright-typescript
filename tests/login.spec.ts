import { test } from '@playwright/test'

import { LoginPage } from '../pages/login-page'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
})

test('deve realizar login com sucesso', async ({ page }) => {
  await loginPage.acessar()
  await loginPage.realizarLogin('qa', 'cademy')
  await loginPage.validarLoginUsuario()
})

test('senha incorreta', async ({ page }) => {
  await loginPage.acessar()
  await loginPage.realizarLogin('qa', 'abc123')
  await loginPage.validarMensagemToast('Oops! Credenciais inválidas :(')
})

test('nome obrigatório', async ({ page }) => {
  await loginPage.acessar()
  await loginPage.realizarLogin('', 'abc123')
  await loginPage.validarMensagemToast('Informe o seu nome de usuário!')
})

test('senha obrigatória', async ({ page }) => {
  await loginPage.acessar()
  await loginPage.realizarLogin('qa', '')
  await loginPage.validarMensagemToast('Informe a sua senha secreta!')
})