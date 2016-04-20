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
              var counterObj = parsedData[counter] = {};
              counterObj['post' + counter] = parsedContent.post;
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

Router.prototype.patch = function(routename, cb) {
  this.routes.PATCH[routename] = cb;
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
              var keys = Object.keys(parsedData);

              var findKeyAndReplace = () => {
                for (var i = 0; i < keys.length - 1; i++) {
                  var dataKey = Object.keys(parsedData[keys[i]])[0];
                  var reqKey = Object.keys(parsedContent)[0];
                  if ( dataKey === reqKey) {
                    console.log('found');
                    return parsedData[keys[i]] = parsedContent;
                  }
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
              var keys = Object.keys(parsedData);

              var findKeyAndDelete = () => {
                for (var i = 0; i < keys.length - 1; i++) {
                  var dataKey = Object.keys(parsedData[keys[i]])[0];
                  var reqKey = Object.keys(parsedContent)[0];
                  if ( dataKey === reqKey) {
                    console.log('found');
                    delete parsedData[keys[i]];
                  }
                }
                console.log('not found in database');
              };

              findKeyAndDelete();

              var counter = parsedData.count;
              parsedData.count = counter.toString();
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
