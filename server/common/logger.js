import pino from 'pino';

const config = require('../../config');

const { APP_ID, LOG_LEVEL } = config;

const l = pino({
  name: APP_ID,
  level: LOG_LEVEL,
});

export default l;
