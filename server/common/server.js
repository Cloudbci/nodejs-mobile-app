/* eslint-disable prettier/prettier */
import Express from 'express';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import l from './logger';
import * as OpenApiValidator from 'express-openapi-validator';
import errorHandler from '../api/middlewares/error.handler';

const app = new Express();

const config = require('../../config');
const { OPENAPI_ENABLE_RESPONSE_VALIDATION, PORT, NAME, REQUEST_LIMIT, SESSION_SECRET, OPENAPI_SPEC, NODE_ENV, } = config;

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);

    const apiSpec = path.join(__dirname, 'api.yml');


    const validateResponses = !!(
      OPENAPI_ENABLE_RESPONSE_VALIDATION &&
      OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
    );

    console.log('Port --> ',PORT);
    console.log(`NAME: ${NAME}`)

    app.use(bodyParser.json({ limit: REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(SESSION_SECRET));
    app.use(Express.static(`${root}/public`));

    app.use(OPENAPI_SPEC || '/spec', Express.static(apiSpec));
    app.use(
      OpenApiValidator.middleware({
        apiSpec,
        validateResponses,
        ignorePaths: /.*\/spec(\/|$)/,
      })
    );
  }

  router(routes) {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port = PORT) {
    const welcome = (p) => () =>
      l.info(
        `up and running in ${
          NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
