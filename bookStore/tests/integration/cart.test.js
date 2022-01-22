import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../src/index';
import Book from '../../src/models/book.model';

chai.should();

chai.use(chaiHttp);

describe('Cart APIs Test', () => {
    before((done) => {
        for (const collection in mongoose.connection.collections) {
          mongoose.connection.collections[collection].deleteOne(() => {});
        };
        done();
    });
    describe('AddToCart Api', () => {
        before((done) => {
            const book = new Book({
                _id: "61eae6b4f45107366c80a9ba",
                status: "Available",
                author: "bharath",
                title: "first book title",
                description: "first book description",
                quantity: 4,
                price: 100
            });
            book.save()
            .then(() => done());
          });

        it('GivenBookInfo_WhenThatBookstatusAvailableButLessStock_shouldreturnLessStock', (done) => {
          const info = {
            bookId: "61eae6b4f45107366c80a9ba",
            quantity: 5,
          };
          const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanBvd2VyamVtczIwQGdtYWlsLmNvbSIsImlkIjoiNjFlN2JkY2QzOTBkZGQwOTk0ODhjNTVjIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2NDI3NTcyMzV9.wc72Gbt4E5kT4eO64Rhz33EIGn8RKMO8KHVEs8BJims"
          chai
          .request(app)
          .put('/api/v1/carts/addtocart')
          .set({ authorization: token })
          .send(info)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("stock is not available, please reduce order quantity");
            done();
          });
        });

        it('GivenBookInfo_WhenThatBookstatusAvailable_shouldAddintocart', (done) => {
          const info = {
            bookId: "61eae6b4f45107366c80a9ba",
            quantity: 4,
          };
          const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanBvd2VyamVtczIwQGdtYWlsLmNvbSIsImlkIjoiNjFlN2JkY2QzOTBkZGQwOTk0ODhjNTVjIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2NDI3NTcyMzV9.wc72Gbt4E5kT4eO64Rhz33EIGn8RKMO8KHVEs8BJims"
          chai
          .request(app)
          .put('/api/v1/carts/addtocart')
          .set({ authorization: token })
          .send(info)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Book added into cart successfully");
            done();
          });
        });

        it('GivenBookInfo_WhenThatBookstatusSoldOut_shouldReturnResCode307', (done) => {
            const info = {
              bookId: "61eae6b4f45107366c80a9ba",
              quantity: 2,
            };
            const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanBvd2VyamVtczIwQGdtYWlsLmNvbSIsImlkIjoiNjFlN2JkY2QzOTBkZGQwOTk0ODhjNTVjIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2NDI3NTcyMzV9.wc72Gbt4E5kT4eO64Rhz33EIGn8RKMO8KHVEs8BJims"
            chai
            .request(app)
            .put('/api/v1/carts/addtocart')
            .set({ authorization: token })
            .send(info)
            .end((err, res) => {
              res.should.have.status(307);
              done();
            });
          });
    });
});
