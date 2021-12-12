/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";

// Cypress.Commands.add("signInWithGoogle", () => {
//   const socialLoginOptions = {
//     username: Cypress.env("GOOGLE_USER"),
//     password: Cypress.env("GOOGLE_PASSWORD"),
//     loginUrl: Cypress.env("SITE_NAME"),
//     headless: true,
//     logs: false,
//     isPopup: true,
//     loginSelector: `a[href="${Cypress.env(
//       "SITE_NAME"
//     )}/api/auth/signin/google"]`,
//     postLoginSelector: ".unread-count",
//   };
//
//   return cy
//     .task("GoogleSocialLogin", socialLoginOptions)
//     .then(({ cookies }) => {
//       cy.clearCookies();
//
//       const cookie = cookies
//         .filter((cookie) => cookie.name === Cypress.env("COOKIE_NAME"))
//         .pop();
//       if (cookie) {
//         cy.setCookie(cookie.name, cookie.value, {
//           domain: cookie.domain,
//           expiry: cookie.expires,
//           httpOnly: cookie.httpOnly,
//           path: cookie.path,
//           secure: cookie.secure,
//         });
//
//         Cypress.Cookies.defaults({
//           preserve: Cypress.env("COOKIE_NAME"),
//         });
//       }
//     });
// });
