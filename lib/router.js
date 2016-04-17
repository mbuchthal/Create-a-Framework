
const Router = module.exports = exports = function() {
    this.routes = {
      'GET': {},
      'POST': {},
      'PUT': {},
      'PATCH': {},
      'DELETE': {}
    };
};

Router.prototype.get = function(routename, content) {
  this.routes.GET[routename] = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(content);
    res.end();
  };
  return this;
};

Router.prototype.post = function(routename, cb) {
  this.routes.POST[routename] = cb;
  return this;
};

Router.prototype.patch = function(routename, cb) {
  this.routes.PATCH[routename] = cb;
  return this;
};

Router.prototype.put = function(routename, cb) {
  this.routes.PUT[routename] = cb;
  return this;
};

Router.prototype.delete = function(routename, cb) {
  this.routes.DELETE[routename] = cb;
  return this;
};

Router.prototype.route = function() {
  var routes = this.routes;
  return function(req, res) {
    if (typeof routes[req.method][req.url] === 'function') {
      return routes[req.method][req.url](req, res);
    }
    res.writeHead(404);
    res.write('Not Found');
    res.end();
  };
};
