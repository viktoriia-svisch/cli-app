"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_CHAT: '"http:
  VUE_APP_API: '"http:
  VUE_APP_GRAPHQL_HTTP: '"http:
});
