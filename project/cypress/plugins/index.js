/// <reference types="cypress" />

require("dotenv").config();
/**
 * @type {Cypress.PluginConfig}
 */
const { GoogleSocialLogin } = require("cypress-social-logins").plugins;

module.exports = (on, config) => {
  on("task", {
    GoogleSocialLogin: GoogleSocialLogin,
  });
  config.env.googleId = process.env.GOOGLE_ID;
  config.env.googleSecret = process.env.GOOGLE_SECRET;
  config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  config.env.googleUser = process.env.GOOGLE_USER;
  config.env.googlePassword = process.env.GOOGLE_PASSWORD;
  config.env.siteName = process.env.SITE_NAME;
  config.env.cookieName = process.env.COOKIE_NAME;
  return config;
};
