/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import './common/env';
import Server from './common/server';
import routes from './routes';

const config = require('../config');

const { NAME, PORT, APP_ID } = config;

console.log(`ENV-->> : ${NAME}:${PORT}/${APP_ID}`);

export default new Server().router(routes).listen(`${PORT}`);
