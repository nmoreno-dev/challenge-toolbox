import server from '../src/index.mjs';
import { should, use } from 'chai';
import chaiHttp from 'chai-http';

should();
const chaiServer = use(chaiHttp);

describe('Server API', () => {
  describe('Files GET route /files/list', () => {
    it(`It should return an object with a single prop "files" with all files names`, (done) => {
      chaiServer
        .request(server)
        .get('/files/list')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.an('object');
          response.body.should.have.property('files');
          response.body.files.should.be.an('array');
          response.body.files.every((file) => typeof file === 'string').should.be.true;
          done();
        });
    });
  });

  describe('Files GET route /files/data', () => {
    it(`It should return an array with a all files data and lines`, (done) => {
      chaiServer
        .request(server)
        .get('/files/data')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body.forEach((item) => {
            item.should.be.an('object');
            item.should.have.property('file');
            item.file.should.be.a('string');
            item.should.have.property('lines');
            item.lines.should.be.an('array');
            item.lines.forEach((line) => {
              line.should.be.an('object');
              line.should.have.property('text');
              line.text.should.be.a('string');
              line.should.have.property('number');
              line.number.should.be.a('number');
              line.should.have.property('hex');
              line.hex.should.be.a('string');
            });
          });
          done();
        });
    });
  });
});
