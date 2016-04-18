const http = require('http');
const Router = require(__dirname + '/router');

var router = module.exports = exports = new Router();

router.server = http.createServer(router.route());

router.getEndpoints = (array) => {
  for (var i = 0; i < array.length; i++ ) {
  var request = array[i];
  router.get(request.url, request.content);
  }
};

router.postEndpoints = (array) => {
  for (var i = 0; i < array.length; i++ ) {
    var request = array[i];
    router.post(request.url, request.saveLocation);
  }
};
