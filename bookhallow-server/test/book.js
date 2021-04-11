//https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
let Book = require("../models/Book");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
    beforeEach((done) => { //Before each test we empty the database
        Book.deleteOne({}, (err) => {
           done();
        });
    });

  describe('/GET book', () => {

      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/book')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });


    describe('/POST book', () => {
        it('it should not POST a book without length field', (done) => {
            let book = {
                title: "The Lord of the Rings",
                authorFirst: "J.R.R.",
                authorLast: "Tolkein",
                publishedYear: 1954
            }
              chai.request(server)
              .post('/book')
              .send(book)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('length');
                    //res.body.errors.length.should.have.property('kind').eql('required');
                done();
              });
        });

        it('it should POST a book ', (done) => {
            let book = {
                title: "The Lord of the Rings",
                authorFirst: "J.R.R.",
                authorLast: "Tolkien",
                publishedYear: 1954,
                length: 1170
            }
              chai.request(server)
              .post('/book')
              .send(book)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully added!');
                    res.body.book.should.have.property('title');
                    res.body.book.should.have.property('authorFirst');
                    res.body.book.should.have.property('authorLast');
                    res.body.book.should.have.property('length');
                    res.body.book.should.have.property('publishedYear');
                done();
              });
        });
    });


  describe('/GET/:id book', () => {
    it('it should GET a book by the given id', (done) => {
        let book = new Book({ title: "The Lord of the Rings", authorFirst: "J.R.R.", authorLast: "Tolkien", publishedYear: 1954, length: 1170 });
        book.save((err, book) => {
            chai.request(server)
          .get('/book/' + book.id)
          .send(book)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('authorFirst');
                res.body.should.have.property('authorLast');
                res.body.should.have.property('length');
                res.body.should.have.property('publishedYear');
                res.body.should.have.property('_id').eql(book.id);
            done();
          });
        });

    });


    describe('/PUT/:id book', () => {
      it('it should UPDATE a book given the id', (done) => {
          let book = new Book({title: "The Chronicles of Narnia", authorFirst: "C.S.", authorLast: "Lewis", publishedYear: 1948, length: 778})
          book.save((err, book) => {
                chai.request(server)
                .put('/book/' + book.id)
                .send({title: "The Chronicles of Narnia", authorFirst: "C.S.", authorLast: "Lewis", publishedYear: 1950, length: 778})
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Book updated!');
                      res.body.book.should.have.property('publishedYear').eql(1950);
                  done();
                });
          });
      });
  });

  describe('/DELETE/:id book', () => {
      it('it should DELETE a book given the id', (done) => {
          let book = new Book({title: "The Chronicles of Narnia", authorFirst: "C.S.", authorLast: "Lewis", publishedYear: 1948, length: 778})
          book.save((err, book) => {
                chai.request(server)
                .delete('/book/' + book.id)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Book successfully deleted!');
                      res.body.result.should.have.property('ok').eql(1);
                      res.body.result.should.have.property('n').eql(1);
                  done();
                });
          });
      });
  });
});

});
