const http = require('http');
const router = require(__dirname + '/lib/handle-routes');

const port = process.env.PORT || 5000;

const syrvup = module.exports = exports = http.createServer(router.route());

syrvup.listen(port, () => {
  process.stdout.write('Server is running at localhost:' + port + '\n');
});
