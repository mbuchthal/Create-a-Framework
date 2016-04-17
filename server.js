const http = require('http');
const Router = require(__dirname + '/lib/router');

var testCallback = function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('yay');
      res.end();
    };
var sampleHtml = __dirname + '/sample.html';

const port = process.env.PORT || 5000;
const urls = [
  { url: '/', content: 'this is the return' },
  { url: '/test', content: sampleHtml },
  { url: '/another', content: testCallback }
];

var router = new Router();

for (var i = 0; i < urls.length; i++ ) {
  var request = urls[i];
  router.get(request.url, request.content);
}

const syrvup = http.createServer(router.route());

syrvup.listen(port, () => {
  process.stdout.write('Server is running at localhost:' + port + '\n');
});
