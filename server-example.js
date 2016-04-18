const syrvup = require(__dirname + '/index');

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
  postUrls: [{ url: '/', saveLocation: __dirname + '/data/' }
  ]
};

syrvup.port = process.env.PORT || 5000;
syrvup.getEndpoints(endpoints.getUrls);
syrvup.postEndpoints(endpoints.postUrls);
syrvup.server.listen(syrvup.port, () => {
  process.stdout.write('Server is running at localhost:' + syrvup.port + '\n');
});
