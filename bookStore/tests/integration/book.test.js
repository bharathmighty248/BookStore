import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../src/index';
import Book from '../../src/models/book.model';

chai.should();

chai.use(chaiHttp);

describe('Book APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('Add Book Api', () => {
    it('GivenBookInfo_WhenTokenNotProvided_shouldReturnAuthorizationRequired', (done) => {
      const info = {
        productImage: {},
        author: "bharath",
        title: "first book title",
        description: "first book description",
        quantity: "10",
        price: "100"
      };
      chai
      .request(app)
      .post('/api/v1/books/addbook')
      .send(info)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message").eql("Authorization token is required");
        done();
      });
    });

    it('GivenBookInfo_WhenIncorrectTokenProvided_shouldReturnAuthorizationRequired', (done) => {
        const incorrecttoken = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXJhdGhtaWdodHkyNDhAZ21haWwuY29tIiwiaWQiOiI2MWU2NWFkNjlhN2UxMjI4MTg0YTVjMjAiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDI1OTQzMDJ9.RTY6xd9qENkLsT491FktjwtQIA2YhN_ml0XmapfWQ0"
        const info = {
          productImage: {},
          author: "bharath",
          title: "first book title",
          description: "first book description",
          quantity: "10",
          price: "100"
        };
        chai
        .request(app)
        .post('/api/v1/books/addbook')
        .set({ authorization: incorrecttoken })
        .send(info)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message").eql("Authorization Failed");
          done();
        });
    });

    it('GivenBookInfo_WhenUserTokenProvided_shouldReturnAdminOnlyHasPermission', (done) => {
        const usertoken = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanBvd2VyamVtczIwQGdtYWlsLmNvbSIsImlkIjoiNjFlN2JkY2QzOTBkZGQwOTk0ODhjNTVjIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2NDI2MDA1MzN9.YVHUsRY9tMxA0a2oML-i_8l4r7gar-dtj_tieXHBFWs"
        const info = {
          productImage: {},
          author: "bharath",
          title: "first book title",
          description: "first book description",
          quantity: "10",
          price: "100"
        };
        chai
        .request(app)
        .post('/api/v1/books/addbook')
        .set({ authorization: usertoken })
        .send(info)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message").eql("Only Admin Had this Permissions");
          done();
        });
    });

    it('GivenBookInfo_WhenCorrectTokenProvided_shouldReturnBookAddSuccess', (done) => {
        const correcttoken = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXJhdGhtaWdodHkyNDhAZ21haWwuY29tIiwiaWQiOiI2MWU2NWFkNjlhN2UxMjI4MTg0YTVjMjAiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDI1OTQzMDJ9.RTY6xd9qENkLsT491FktjwtQIA2YhN_ml0XmapfWQ0A"
        const info = {
          author: "bharath",
          title: "first book title",
          description: "first book description",
          quantity: "10",
          price: "100"
        };
        chai
        .request(app)
        .post('/api/v1/books/addbook')
        .set({ authorization: correcttoken })
        .send(info)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("message").eql("Book added successfully");
          done();
        });
    });
  });

  describe('GetAll Books Api', () => {
    it('WhenRequestedGetAllBooks_shouldReturnAvailableBooks', (done) => {
        chai
        .request(app)
        .get('/api/v1/books/getallbooks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Available books");
          done();
        });
    });
  });

  describe('Update Book Api', () => {
    it('GivenBookInfo_WhenUserTokenProvided_shouldReturnAdminOnlyHasPermission', (done) => {
        const usertoken = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanBvd2VyamVtczIwQGdtYWlsLmNvbSIsImlkIjoiNjFlN2JkY2QzOTBkZGQwOTk0ODhjNTVjIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2NDI2MDA1MzN9.YVHUsRY9tMxA0a2oML-i_8l4r7gar-dtj_tieXHBFWs"
        const info = {
          author: "bharath",
          title: "first book title",
          description: "first book description",
          quantity: "10",
          price: "100"
        };
        chai
        .request(app)
        .put('/api/v1/books/updatebook/61e809e80811ed1178039e5e')
        .set({ authorization: usertoken })
        .send(info)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message").eql("Only Admin Had this Permissions");
          done();
        });
    });
    it('GivenupdateInfo_WhenCorrectTokenProvided_shouldReturnBookNotFound', (done) => {
        const correcttoken = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXJhdGhtaWdodHkyNDhAZ21haWwuY29tIiwiaWQiOiI2MWU2NWFkNjlhN2UxMjI4MTg0YTVjMjAiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDI1OTQzMDJ9.RTY6xd9qENkLsT491FktjwtQIA2YhN_ml0XmapfWQ0A"
        const info = {
          author: "bharath",
          title: "first book title",
          description: "first book description",
          quantity: "10",
          price: "100"
        };
        chai
        .request(app)
        .put('/api/v1/books/updatebook/61e809e80811ed1178039e5e')
        .set({ authorization: correcttoken })
        .send(info)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message").eql("Book Not Found");
          done();
        });
    });
  })

  describe('Search Book Api', () => {
    it('WhenSearchBookByTitle_IfFound_shouldReturnBook', (done) => {
        chai
        .request(app)
        .get('/api/v1/books/searchbook/first book title')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("search results");
          done();
        });
    });

    it('WhenSearchBookByTitle_IfNotFound_shouldReturnNotFound', (done) => {
      chai
      .request(app)
      .get('/api/v1/books/searchbook/first book')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message").eql("Book Not Found");
        done();
      });
  });
  });

  describe('Delete Book Api', () => {
    it('GivenBookInfo_WhenUserTokenProvided_shouldReturnAdminOnlyHasPermission', (done) => {
        const usertoken = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhanBvd2VyamVtczIwQGdtYWlsLmNvbSIsImlkIjoiNjFlN2JkY2QzOTBkZGQwOTk0ODhjNTVjIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE2NDI2MDA1MzN9.YVHUsRY9tMxA0a2oML-i_8l4r7gar-dtj_tieXHBFWs"
        chai
        .request(app)
        .delete('/api/v1/books/deletebook/61e809e80811ed1178039e5e')
        .set({ authorization: usertoken })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message").eql("Only Admin Had this Permissions");
          done();
        });
    });
    it('GivenDeleteInfo_WhenCorrectTokenProvided_shouldReturnBookNotFound', (done) => {
        const correcttoken = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJoYXJhdGhtaWdodHkyNDhAZ21haWwuY29tIiwiaWQiOiI2MWU2NWFkNjlhN2UxMjI4MTg0YTVjMjAiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NDI1OTQzMDJ9.RTY6xd9qENkLsT491FktjwtQIA2YhN_ml0XmapfWQ0A"
        chai
        .request(app)
        .delete('/api/v1/books/deletebook/61e809e80811ed1178039e5e')
        .set({ authorization: correcttoken })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message").eql("Book Not Found");
          done();
        });
    });
  })
});
