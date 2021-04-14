//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
const Book = require("../models/Book");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Search', () => {
      before((done) => { //Before running the tests empty the database
        Book.deleteMany({}, (err) => {
          done();
        });
      });



      describe('/GET/search/:title book', () => {
        it('it should GET a book by the given title', (done) => {
            let book = new Book({ title: "The Lord of the Rings", authorFirst: "J.R.R.", authorLast: "Tolkien", publishedYear: 1954, length: 1170 });
            book.save((err, book) => {
                chai.request(server)
              .get('/search/' + book.title)
              .send(book)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
            });

      });
  });

});
