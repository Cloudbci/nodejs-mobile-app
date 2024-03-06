// /* eslint-disable prettier/prettier */
// const fs = require('fs'); 
// const yaml = require('js-yaml');
// // Load the YAML file into a JavaScript object 
// const CI_ENV = yaml.safeLoad(fs.readFileSync('.github/workflows/CI.yml', 'utf8'));

// const core = require('@actions/core');

const config = {
  APP_ID: 'myapp',
  PORT: process.env.PORT,
  LOG_LEVEL: 'debug',
  REQUEST_LIMIT: '100kb',
  SESSION_SECRET: process.env.SESSION_SECRET,
  OPENAPI_SPEC: '/api/v1/spec',
  OPENAPI_ENABLE_RESPONSE_VALIDATION: false,
  NAME: process.env.NAME,
  NODE_ENV: 'development',
};

module.exports = config;

