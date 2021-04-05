//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
let UserBook = require("../models/UserBook");
let User = require("../models/User");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('User Books', () => {

  describe('/GET userBook', () => {
    it('it should not GET all the user books when not logged in', (done) => {
      chai.request(server)
        .get('/mybooks')
        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });

    it('it should log in a user', (done) => {
      let user = {
        username: "testUserBook",
        password: "123456789",
      }
      chai.request(server)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it should create a book list', (done) => {
      chai.request(server)
        .post('/booklist/testList')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should add a book to the book list', (done) => {
      chai.request(server)
        .post('/mybooks/testList/Becoming')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('it should  GET all the user books', (done) => {
      chai.request(server)
        .get('/mybooks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

  }); // end /GET userBook


}); // end of describe User Books
