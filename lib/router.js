const path = require('path');
const fs = require('fs');

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
  if (typeof content === 'string' && path.extname(content) !== '.html') {
    this.routes.GET[routename] = (req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(content);
      res.end();
    };
  }
  if (typeof content === 'string' && path.extname(content) === '.html') {
    this.routes.GET[routename] = (req, res) => {
      fs.readFile(content, (err, data) => {
        if (err) throw err;
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
      });
    };
  }
  if (typeof content === 'function') {
    this.routes.GET[routename] = content;
  }
  return this;
};

Router.prototype.post = function(routename, saveLocation) {
  fs.stat(saveLocation, (err, stats) => {
    if (err) return console.error('1st directory does not exist, please update path');
    if (stats.isDirectory()) {
      fs.stat(saveLocation + 'postData.json', (err) => {
        if (err) {
          fs.writeFile(saveLocation + 'postData.json', '{"count": "0"}', (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
          });
        }
        fs.readFile(saveLocation + 'postData.json', (err, data) => {
          if (err) throw err + 'readfile unsuccessful';
          var parsedData = JSON.parse(data);
          var counter = parsedData.count;
          this.routes.POST[routename] = (req, res) => {
            req.on('data', (jsonData) => {
              counter++;
              parsedData.count = counter.toString();
              var parsedContent = JSON.parse(jsonData);
              parsedData[counter] = parsedContent;
              var stringData = JSON.stringify(parsedData);
              fs.writeFile(saveLocation + 'postData.json', stringData, (err) => {
                if (err) throw err;
                res.writeHead(200, {
                  'Content-Type': 'text/html'
                });
                res.write('<h1>post successful</h1>');
                res.end();
              });
            });
          };
          return this;
        });
      });
    }
  });
};

Router.prototype.patch = function(routename, content) {
  if (typeof content === 'function') {
    this.routes.PATCH[routename] = content;
  } else {
    this.routes.PATCH[routename] = (req, res) => {
      res.writeHead(405, { 'Content-Type': 'text/html' });
      res.write('<h2>Method not allowed</h2>');
      res.end();
    };
  }
  return this;
};

Router.prototype.put = function(routename, saveLocation) {
  fs.stat(saveLocation, (err, stats) => {
    if (err) return console.error('1st directory does not exist, please update path');
    if (stats.isDirectory()) {
      fs.stat(saveLocation + 'postData.json', (err) => {
        if (err) {
          fs.writeFile(saveLocation + 'postData.json', '{"count": "0"}', (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
          });
        }
        fs.readFile(saveLocation + 'postData.json', (err, data) => {
          if (err) throw err + 'readfile unsuccessful';
          var parsedData = JSON.parse(data);
          this.routes.PUT[routename] = (req, res) => {
            req.on('data', (jsonData) => {
              var parsedContent = JSON.parse(jsonData);
              var key = Object.keys(parsedContent)[0];
              var findKeyAndReplace = () => {
                  if (parsedData[key]) {
                    console.log('found');
                    return parsedData[key] = parsedContent[key];
                  }
                console.log('not found in database');
              };
              findKeyAndReplace();
              var stringData = JSON.stringify(parsedData);
              fs.writeFile(saveLocation + 'postData.json', stringData, (err) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h2>Updated!</h2>');
                res.end();
              });
            });
          };
          return this;
        });
      });
    }
  });
};


Router.prototype.delete = function(routename, saveLocation) {
  fs.stat(saveLocation, (err, stats) => {
    if (err) return console.error('1st directory does not exist, please update path');
    if (stats.isDirectory()) {
      fs.stat(saveLocation + 'postData.json', (err) => {
        if (err) {
          fs.writeFile(saveLocation + 'postData.json', '{"count": "0"}', (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
          });
        }
        fs.readFile(saveLocation + 'postData.json', (err, data) => {
          if (err) throw err + 'readfile unsuccessful';
          var parsedData = JSON.parse(data);
          this.routes.DELETE[routename] = (req, res) => {
            req.on('data', (jsonData) => {
              var parsedContent = JSON.parse(jsonData);
              var key = Object.keys(parsedContent)[0];
              var findKeyAndDelete = () => {
                if (parsedData[key]) {
                  console.log('found');
                  return delete parsedData[key];
                }
                console.log('not found in database');
              };
              findKeyAndDelete();
              var stringData = JSON.stringify(parsedData);
              fs.writeFile(saveLocation + 'postData.json', stringData, (err) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h2>Shredded that shit</h2>');
                return res.end();
              });
            });
          };
          return this;
        });
      });
    }
  });
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
