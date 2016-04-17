const Router = require(__dirname + '/router');
const endpoints = require(__dirname + '/../endpoints/endpoints');

var router = module.exports = exports = new Router();

for (var i = 0; i < endpoints.getUrls.length; i++ ) {
  var request = endpoints.getUrls[i];
  router.get(request.url, request.content);
}
