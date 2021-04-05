//https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
let User = require("../models/User");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
      // beforeEach((done) => { //Before each test we empty the database
      //   User.deleteOne({}, (err) => {
      //     done();
      //   });
      // });
      /*
       * Test the /GET route
       */
      describe('/GET user', () => {
        it('it should GET all the users', (done) => {
          chai.request(server)
            .get('/auth')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              done();
            });
        });
      });

      describe('/GET/:id user', () => {
        it('it should GET a user by the given id', (done) => {
          let user = new User({
            username: "testId",
            email: "test@gmail.com",
            password: "123456789",
          });
          user.save((err, user) => {
            chai.request(server)
              .get('/auth/' + user.id)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('username');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('_id').eql(user.id);
                done();
              });
          });

        });
      });

        describe('/POST user', () => {
          it('it should not register a user without an email', (done) => {
            let user = {
              username: "noEmail",
              password: "123456789",
              passwordVerify: "123456789",
            }
            chai.request(server)
              .post('/auth')
              .send(user)
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                //     res.body.should.have.property('errors');
                //     res.body.errors.should.have.property('email');
                //     res.body.errors.email.should.have.property('kind').eql('required');
                done();
              });
          });

          it('it should not register a user with mismatched passwords', (done) => {
            let user = {
              username: "noEmail",
              email: "test@gmail.com",
              password: "123456789",
              passwordVerify: "password",
            }
            chai.request(server)
              .post('/auth')
              .send(user)
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                //     res.body.should.have.property('errors');
                //     res.body.errors.should.have.property('email');
                //     res.body.errors.email.should.have.property('kind').eql('required');
                done();
              });
          });


          it('it should register a user with an email ', (done) => {
            let user = {
              username: "noEmail",
              email: "test@gmail.com",
              password: "123456789",
              passwordVerify: "123456789"
            }
            chai.request(server)
              .post('/auth')
              .send(user)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.should.have.property('username');
                // res.body.should.have.property('email');
                // res.body.should.have.property('password');
                // res.body.should.have.property('passwordVerify');
                done();
              });
          });

          it('it should not register a user with a duplicate username ', (done) => {
            let user = {
              username: "noEmail",
              email: "test@gmail.com",
              password: "123456789",
              passwordVerify: "123456789"
            }
            chai.request(server)
              .post('/auth')
              .send(user)
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                // res.body.should.have.property('username');
                // res.body.should.have.property('email');
                // res.body.should.have.property('password');
                // res.body.should.have.property('passwordVerify');
                done();
              });
          });


          it('it should not register a user with a password < 8 characters ', (done) => {
            let user = {
              username: "shortPassword",
              email: "test@gmail.com",
              password: "123",
              passwordVerify: "123"
            }
            chai.request(server)
              .post('/auth')
              .send(user)
              .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                // res.body.should.have.property('username');
                // res.body.should.have.property('email');
                // res.body.should.have.property('password');
                // res.body.should.have.property('passwordVerify');
                done();
              });
          });

          it('it should not log in a user with wrong password', (done) => {
            let user = {
              username: "noEmail",
              password: "password",
            }
            chai.request(server)
              .post('/auth/login/')
              .send(user)
              .end((err, res) => {
                res.should.have.status(401);
                done();
              });
          });

          it('it should not log in a user with wrong username', (done) => {
            let user = {
              username: "wrongUsername",
              password: "password",
            }
            chai.request(server)
              .post('/auth/login/')
              .send(user)
              .end((err, res) => {
                res.should.have.status(401);
                done();
              });
          });

          it('it should not log in a user with missing password', (done) => {
            let user = {
              username: "noEmail",
            }
            chai.request(server)
              .post('/auth/login/')
              .send(user)
              .end((err, res) => {
                res.should.have.status(400);
                done();
              });
          });

          it('it should log in a user', (done) => {
            let user = {
              username: "noEmail",
              password: "123456789",
            }
            chai.request(server)
              .post('/auth/login/')
              .send(user)
              .end((err, res) => {
                res.should.have.status(200);
                done();
              });
          });

          it('it should describe if user is logged in as true ', (done) => {
            chai.request(server)
              .get('/auth/loggedIn/')
              .end((err, res) => {
                res.should.have.status(200);
                res.should.be.true;
                done();
              });
          });

        it('it should log user out ', (done) => {
          chai.request(server)
            .get('/auth/logout/')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });

        it('it should describe if user is logged in as false ', (done) => {
          chai.request(server)
            .get('/auth/loggedIn/')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });

    describe('/GET/:id user', () => {
      it('it should GET a user by the given id', (done) => {
        let user = new User({
          username: "getIdTest",
          email: "test@gmail.com",
          password: "123456789",
        });
        user.save((err, user) => {
          chai.request(server)
            .get('/auth/' + user.id)
            .send(user)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('username');
              res.body.should.have.property('email');
              res.body.should.have.property('password');
              res.body.should.have.property('_id').eql(user.id);
              done();
            });
        });

      });

    });

});
