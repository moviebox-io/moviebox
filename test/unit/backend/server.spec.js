// import config from '../../../config/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.should();

chai.use(chaiHttp);

describe('Server', () => {
  let server = null;

  beforeEach(() => {
    // require().default is being used here because
    // we are not using the normal ES6 import, because
    // we want a new instance everytime we require the module
    server = require('../../../backend/server').default;
  });

  describe('/api', () => {
    it('it should GET the api', (done) => {
      chai.request(server)
        .get('/api')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('version');
          done();
        });
    });
  });
});