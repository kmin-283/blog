/// <reference types="cypress" />

import "./commands";

const COOKIE_NAME = "cookie_notice";
// The value meaning that user has accepted the cookie policy
const COOKIE_VALUE = "ACCEPTED";

Cypress.on("window:before:load", (window) => {
  window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
});
