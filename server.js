const http = require('http');
const Router = require(__dirname + '/lib/router');

const port = process.env.PORT || 5000;
const urls = [{ url: '/', content: 'this is the return' },
{ url: '/test', content: 'test content' },
{ url: '/another', content: 'another' }
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
