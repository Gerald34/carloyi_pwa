import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// import * as express from './node_modules/express';
const express = require('express');
import { join } from 'path';
// global['navigator'] = {  userAgent: ''};
import { renderModuleFactory } from '@angular/platform-server';
// const MockBrowser = require('mock-browser').mocks.MockBrowser;
// const mock = new MockBrowser();
import 'localstorage-polyfill';

// const dotenv = require('dotenv');
// dotenv.config();
// const config = filterEnv(/(BB_\w+)/, {json: true, freeze: true});

// import * as cors from './node_modules/cors';
const cors = require('cors');
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const http = require('http');
const https = require('https');
// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
const allowedOrigins = ['https://api.carloyi.com/', 'http://localhost:4000/', 'https://www.carloyi.com/'];
app.use(cors({
  origin: function(origin, callback) {
    // (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }    return callback(null, true);
  }
}));
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const domino = require('domino');
const fs = require('fs');
const path = require('path');
// const template = fs.readFileSync(path.join(__dirname, join(DIST_FOLDER, 'browser/index.html'))).toString();
const template = fs.readFileSync(path.join(__dirname, '.', '/var/www/html/stage/dist', 'browser', 'index.html')).toString();
const win = domino.createWindow(template);

global['window'] = win;
global['navigator'] = win.navigator;
global['Node'] = win.Node;
global['Event'] = win.Event;
global['Event']['prototype'] = win.Event.prototype;
global['document'] = win.document;
global["branch"] = null;
global['localStorage'] = localStorage;
global['CSS'] = null;
global['Prism'] = null;

// global['navigator'] = mock.getNavigator();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [ provideModuleMap(LAZY_MODULE_MAP) ]
}));

app.set('view engine', 'html');
// app.set('views', join(DIST_FOLDER, 'browser'));
app.set('views', '/var/www/html/stage/dist/browser');
app.set('view cache', true);
app.use('/', express.static('dist/browser', { index: false, maxAge: 30 * 86400000 }));

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [ provideModuleMap(LAZY_MODULE_MAP) ]
  }).then(html => {
    callback(null, html);
  });
});

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

app.get('https://api.carloyi.com/index.php/api/brands', (req, res) => {
  console.log(res);
});

// Start up the Node server
// app.listen(PORT, () => {
//   console.log(`Node Express server listening on http://localhost:${PORT}`);
// });

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/etc/ssl/private/*.carloyi.key'),
  cert: fs.readFileSync('/etc/ssl/private/Certificates/STAR_carloyi_com.crt')
};

// Create an HTTPS service identical to the HTTP service.
const server = https.createServer(options, app).listen(4000, function(err) {
    if (err) {
	console.log(err);
    } else {
	
        // const host = '154.66.197.198';
	const host = 'stage.caloyi.com';
        const port = server.address().port;
        console.log(host);
        console.log(`Server listening on ${host}:${port}`);
    }
});
