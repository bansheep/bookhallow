//https://stackoverflow.com/questions/36103376/mocha-testing-authenticated-apis-provided-by-a-server/36104194

process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
let UserBook = require("../models/UserBook");
let User = require("../models/User");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('User Books', () => {

  beforeEach((done) => {
           console.log("Before test");

           let newUser = new User({
             username: "userbooktest",
             email: "userbooktest@email.com",
             password: "123456789",
             passwordVerify: "123456789"
           });
           newUser.save();

           let user = {
             username: "userbooktest",
             password: "123456789"
           }

           chai.request(server)
               .post('/auth/login/')
               .send(user)
               .end(function(err, res) {
                   if(err) res.send(err);
                   else res.should.have.status(200);
                   done();
               });
       });

       afterEach(function() {
           User.remove({username: 'userbooktest'}, function(){});
       });

  describe('/GET userBook', () => {
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

    it('it should not GET all the user books when not logged in', (done) => {
      chai.request(server)
          .post('auth/logout')
          .end((err, res) => {
          });

      chai.request(server)
        .get('/mybooks')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

  }); // end /GET userBook


}); // end of describe User Books
