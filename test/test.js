const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
require(__dirname + '/test_directory');
const request = chai.request;
const syrvup = require(__dirname + '/../lib/handle-routes');
const fs = require('fs');
process.env.PORT = 5000;

describe('put request', () => {
  before((done) => {
    require(__dirname + '/../server-example');
    var pathName = __dirname + '/../data/postData.json';
    fs.writeFileSync(pathName, '{"1":{"hello":"world"},"count":"1"}');
    setTimeout(() => {
      done();
    }, 500);
  });

  after((done) => {
    syrvup.server.close(() => {
      done();
    });
  });

  it('should accept JSON put requests', (done) => {
    request('localhost:5000')
    .put('/')
    .send('{"1":{"changed":"put request successful"}}')
    .end((err, res) => {
      fs.readFile(__dirname + '/../data/postData.json', (err, data) => {
        if (err) throw err;
        var newParsedData = JSON.parse(data);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('<h2>Updated!</h2>');
        expect(newParsedData['1']).to.eql({ changed: 'put request successful' });
        done();
      });
    });
  });
});

describe('delete request', () => {
  before((done) => {
    fs.writeFileSync(__dirname + '/../data/postData.json', '{"1":{"hello":"world"},"count":"1"}');
    syrvup.server.listen(syrvup.port, () => {
      process.stdout.write('Server is running at localhost:' + syrvup.port + '\n');
      done();
    });
  });

  after((done) => {
    syrvup.server.close(() => {
      done();
    });
  });

  it('should accept JSON delete requests', (done) => {
    request('localhost:5000')
    .delete('/')
    .send('{"1":"delete"}')
    .end((err, res) => {
      fs.readFile(__dirname + '/../data/postData.json', (err, data) => {
        if (err) throw err;
        var newParsedData = JSON.parse(data);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('<h2>Shredded that shit</h2>');
        expect(newParsedData['1']).to.eql(undefined);
        done();
      });
    });
  });
});

describe('server', () => {
  before((done) => {
    syrvup.server.listen(syrvup.port, () => {
      process.stdout.write('Server is running at localhost:' + syrvup.port + '\n');
      done();
    });
  });

  after((done) => {
    syrvup.server.close(() => {
      done();
    });
  });

  it('should accept GET requests with string content', (done) => {
    request('localhost:5000')
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('this is the return');
      done();
    });
  });

  it('should accept GET requests with html content', (done) => {
    request('localhost:5000')
    .get('/test')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('<h1>Hello</h1>\n');
      done();
    });
  });

  it('should accept GET requests with callbacks', (done) => {
    request('localhost:5000')
    .get('/another')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('yay');
      done();
    });
  });

  it('should accept JSON posts', (done) => {
    request('localhost:5000')
    .post('/')
    .send({ hello: 'world' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('<h1>post successful</h1>');
      console.log('post is done');
      done();
    });
  });

  it('bad routes should respond with 404', (done) => {
    request('localhost:5000')
    .get('/gibberish')
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(err.toString()).to.eql('Error: Not Found');
      expect(res.text).to.eql('Not Found');
      done();
    });
  });
});
