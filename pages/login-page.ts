import { Page, expect } from '@playwright/test'

export class LoginPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    // acessar a página de login
    async acessar() {
        await this.page.goto('https://login-app-qacademy.vercel.app/');
        const title = this.page.locator('.App-header p')
        await expect(title).toHaveText('Login')
    }

    // submeter o formulário de login
    async realizarLogin(usuario: string, senha: string) {
        await this.page.fill('input[placeholder$=usuário]', usuario)
        await this.page.fill('input[placeholder^=senha]', senha)

        // combinar seletores por meio do recurso do playwright ">>" 
        await this.page.click('button >> text=Entrar')
    }

    // validar o login no modal
    async validarLoginUsuario() {
        const mensagemModalObtida = this.page.locator('.swal2-html-container')
        await expect(mensagemModalObtida).toHaveText('Sua credenciais são validas :)')
    }
    
    // validar a mensagem no toaster
    async validarMensagemToast(mensagemToastEsperada: string) {
        const mensagemToastObtida = this.page.locator('div[role=status]')
        await expect(mensagemToastObtida).toHaveText(mensagemToastEsperada)
    }

}