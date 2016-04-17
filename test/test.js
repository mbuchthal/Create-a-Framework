
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request;
const server = require(__dirname + '/../server');
const endpoints = require(__dirname + '/../endpoints/endpoints')

describe('server', () => {
  after((done) => {
    server.close(() => {
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
    .send('{ "hello": "world" }')
    .end((err, res) => {
      expect(err).to.eql(null);
      // expect(res).to.have.status(200);
      // expect(res.text).to.eql('yay');
      done();
    });
  });

});
