const http = require('http');
const Router = require(__dirname + '/lib/router');

const port = process.env.PORT || 5000;

var router = new Router()
// .get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('Your running fine');
//   res.end();
// })
.many([{ url: '/', content: 'this is the return' },
{ url: '/test', content: 'test content' },
{ url: '/another', content: 'another' }
]);

const syrvup = http.createServer(router.route());

syrvup.listen(port, () => {
  process.stdout.write('Server is running at localhost:' + port + '\n');
});
