import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
           });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
           });

    it('Верный логин и верный пароль', function () {
        cy.visit('/');
        cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();

         cy.get(result_page.title).contains('Авторизация прошла успешно');
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
         cy.get(result_page.title).should('be.visible');
    })  
 })

 it('Верный логин и неверный пароль', function () {
    cy.visit('/');
    cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
    cy.get('#mail').type(data.login);
    cy.get('#pass').type('iLoveqastudio7');
    cy.get('#loginButton').click();

    cy.get('#messageHeader').contains('Такого логина или пароля нет');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    cy.get('#messageHeader').should('be.visible');
})

it('Проверка, что в логине есть @', function () {
    cy.visit('/');
    cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
    cy.get(main_page.email).type('germandolnikov.ru');
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();

    cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    cy.get(result_page.title).should('be.visible');
})

it('Проверка восстановления пароля', function () {
    cy.visit('/');
    cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
    cy.get(main_page.forgot_pass_btn).click();
    cy.get(recovery_page.email).type('german@dolnikov.ru');
    cy.get(recovery_page.send_button).click();

    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    cy.get(result_page.title).should('be.visible');
})

it('Неверный логин и верный пароль', function () {
    cy.visit('/');
    cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
    cy.get('#mail').type('german@donikov.ru');
    cy.get('#pass').type(data.password);
    cy.get('#loginButton').click();

    cy.get('#messageHeader').contains('Такого логина или пароля нет');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    cy.get('#messageHeader').should('be.visible');
})

it('Проверка на приведение к строчным буквам в логине', function () {
    cy.visit('/');
    cy.get(main_page.forgot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
    cy.get('#mail').type('GerMan@Dolnikov.ru');
    cy.get('#pass').type(data.password);
    cy.get('#loginButton').click();

    cy.get('#messageHeader').contains('Такого логина или пароля нет');
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    cy.get('#messageHeader').should('be.visible');
})
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 