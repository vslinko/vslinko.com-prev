var Hapi = require('hapi');
var path = require('path');

var server = new Hapi.Server();

server.connection({
  host: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 8000
});

server.views({
  engines: {
    'html.twig': {
      module: require('swig'),
      compileOptions: {
        cache: false
      }
    }
  },
  path: path.join(__dirname, 'views'),
  isCached: process.env.NODE_ENV === 'production'
});

server.route({
  method: 'GET',
  path: '/',
  handler: {
    view: {
      template: 'mainpage'
    }
  }
});

server.route({
  method: 'GET',
  path: '/resume',
  handler: {
    view: {
      template: 'resume'
    }
  }
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: path.join(__dirname, 'public')
    }
  }
});

server.start();
