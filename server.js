const http = require('http');
const router = require(__dirname + '/lib/handle-routes');

const port = process.env.PORT || 5000;

const syrvup = module.exports = exports = http.createServer(router.route());

var testCallback = function(req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('yay');
      res.end();
    };

var sampleHtml = __dirname + '/sample.html';

var endpoints = {
  getUrls: [
    { url: '/', content: 'this is the return' },
    { url: '/test', content: sampleHtml },
    { url: '/another', content: testCallback }
  ],
  postUrls: [{ url: '/', saveLocation: __dirname + '/data/all-data.json' }
  ]
};

router.getEndpoints(endpoints.getUrls);
router.postEndpoints(endpoints.postUrls);
syrvup.listen(port, () => {
  process.stdout.write('Server is running at localhost:' + port + '\n');
});
