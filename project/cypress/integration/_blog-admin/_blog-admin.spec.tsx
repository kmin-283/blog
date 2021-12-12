/// <reference types="cypress" />

describe("_blog-amdin page 테스트", () => {
  beforeEach(() => {
    cy.visit("/_blog-admin");
  });
  it("login", () => {
    // const socialLoginOptions = {
    //   username: Cypress.env("googleUser"),
    //   password: Cypress.env("googlePassword"),
    //   loginUrl: Cypress.env("siteName"),
    //   headless: true,
    //   logs: false,
    //   isPopup: true,
    //   loginSelector: ".provider:last-child form .button",
    //   postLoginSelector: ".unread-count",
    // };
    //
    // return cy
    //   .task("GoogleSocialLogin", socialLoginOptions)
    //   .then(({ cookies }) => {
    //     cy.clearCookies();
    //
    //     const cookie = cookies
    //       .filter((cookie) => cookie.name === Cypress.env("cookieName"))
    //       .pop();
    //     if (cookie) {
    //       cy.setCookie(cookie.name, cookie.value, {
    //         domain: cookie.domain,
    //         expiry: cookie.expires,
    //         httpOnly: cookie.httpOnly,
    //         path: cookie.path,
    //         secure: cookie.secure,
    //       });
    //
    //       Cypress.Cookies.defaults({
    //         preserve: Cypress.env("cookieName"),
    //       });
    //     }
    //   });
  });
});
