var express = require('express');
var parseUrl = require('parseurl');
var send = require('send');
var path = require('path');
var colors = require('colors');
var os = require('os');

var port = 9099;
var app = express();
var root = path.join(__dirname, 'webapps');
var opts = {
  'root': path.resolve(root)
};

app.use(function (req, res, next) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.setHeader('Content-Length', '0');
    res.end('405 Method Not Allowed');
  }

  var url = parseUrl.original(req);
  var pathname = parseUrl(req).pathname;

  if (pathname === '/' && url.pathname.substr(-1) !== '/') {
    pathname = '';
  }

  var stream = send(req, pathname, opts);

  stream.on('error', function (err) {
    switch (err.statusCode) {
      case 404:
        res.status(404).end('404 Not Found');
        break;
      default:
        res.status(500).end('500 Internal Server Error');
    }

    next(err);
  });

  stream.on('file', function (path) {
    res.originalPath = path;
  });

  stream.on('end', function () {
    next();
  });

  stream.pipe(res);
});

app.use(function (err, req, res, next) {
  next();
});

app.use(function (req, res, next) {
  var pathDiff = '';
  if (typeof res.originalPath !== 'undefined') {
    var servedFile = path.relative(root, res.originalPath);
    if (!req.url.endsWith(servedFile)) {
      pathDiff = colors.gray('=> ') + colors.reset.underline(servedFile);
    }
  }

  var status = res.statusCode;
  if (status != 200) {
    status = colors.black.bgRed(status);
  }

  console.log('%s %s %s %s', colors.magenta.bold(req.method), status, colors.cyan.underline(req.url), pathDiff);
  next();
});

app.listen(port);

console.log('Started webapp dev server at: %s\n', colors.cyan.underline('http://' + os.hostname() + ':' + port));
