import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../src/index';
import Book from '../../src/models/book.model';

chai.should();

chai.use(chaiHttp);

describe('Wishlist APIs Test', () => {
    before((done) => {
        for (const collection in mongoose.connection.collections) {
          mongoose.connection.collections[collection].deleteOne(() => {});
        };
        done();
    });
    describe('AddToWishlist Api', () => {
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

        it('GivenBookInfo_WhenThatBookisNotExist_shouldreturnNotFound', (done) => {
          const info = {
            bookId: "61eae6b4f45107366c80a9bb"
          };
          const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanBvd2VyamVtczIwQGdtYWlsLmNvbSIsImlkIjoiNjFlN2JkY2QzOTBkZGQwOTk0ODhjNTVjIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2NDI3NTcyMzV9.wc72Gbt4E5kT4eO64Rhz33EIGn8RKMO8KHVEs8BJims"
          chai
          .request(app)
          .post('/api/v1/wishlist/add')
          .set({ authorization: token })
          .send(info)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property("message").eql("Book Not Found");
            done();
          });
        });

        it('GivenBookInfo_WhenThatBookisPresent_shouldAddintoWishlist', (done) => {
          const info = {
            bookId: "61eae6b4f45107366c80a9ba"
          };
          const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanBvd2VyamVtczIwQGdtYWlsLmNvbSIsImlkIjoiNjFlN2JkY2QzOTBkZGQwOTk0ODhjNTVjIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2NDI3NTcyMzV9.wc72Gbt4E5kT4eO64Rhz33EIGn8RKMO8KHVEs8BJims"
          chai
          .request(app)
          .post('/api/v1/wishlist/add')
          .set({ authorization: token })
          .send(info)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("message").eql("Book added into wishlist successfully");
            done();
          });
        });

        it('GivenBookInfo_WhenThatBookisAlreadyAddedIntoWishlist_shouldReturnSame', (done) => {
            const info = {
              bookId: "61eae6b4f45107366c80a9ba"
            };
            const token = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanBvd2VyamVtczIwQGdtYWlsLmNvbSIsImlkIjoiNjFlN2JkY2QzOTBkZGQwOTk0ODhjNTVjIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2NDI3NTcyMzV9.wc72Gbt4E5kT4eO64Rhz33EIGn8RKMO8KHVEs8BJims"
            chai
            .request(app)
            .post('/api/v1/wishlist/add')
            .set({ authorization: token })
            .send(info)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property("message").eql("Book already in wishlist");
              done();
            });
        });
    });
});