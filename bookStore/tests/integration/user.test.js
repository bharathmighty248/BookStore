import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../src/index';

chai.should();

chai.use(chaiHttp);

describe('Admin APIs Test', () => {
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

  describe('Admin registration Api', () => {
    it('GivenRegistrationDetails_WhenProper_shouldReturnSuccessWithRoleAdmin', (done) => {
      const register = {
        firstName: "bharath",
        lastName: "pasumarthi",
        email: "bharathmighty248@gmail.com",
        password: "bharath@248"
      };
      chai
      .request(app)
      .post('/api/v1/users/admin')
      .send(register)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message").eql("Registration successfull");
        res.body.data.should.have.property("role").eql("Admin");
        done();
      });
    });

    it('GivenRegistrationDetails_WhenEmailAlreadyRegistered_shouldReturnConflict', (done) => {
      const register = {
        firstName: "bharath",
        lastName: "pasumarthi",
        email: "bharathmighty248@gmail.com",
        password: "bharath@248"
      };
      chai
      .request(app)
      .post('/api/v1/users/admin')
      .send(register)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property("message").eql("Email Already Exist");
        done();
      });
    });
  });

  describe('Login Api', () => {
    it('GivenloginDetails_WhennotRegistered_shouldNotLogin', (done) => {
      const login = {
        email: "bharathmighty@gmail.com",
        password: "bharath@248"
      };
      chai
      .request(app)
      .post('/api/v1/users/login')
      .send(login)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message").eql("Not Registered Yet");
        done();
      });
    });

    it('GivenloginDetails_WhenIncorrectPassword_shouldNotLogin', (done) => {
      const login = {
        email: "bharathmighty248@gmail.com",
        password: "bharath@24"
      };
      chai
      .request(app)
      .post('/api/v1/users/login')
      .send(login)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property("message").eql("Incorrect Password");
        done();
      });
    });

    it('GivenloginDetails_WhenCorrect_shouldLogin', (done) => {
      const login = {
        email: "bharathmighty248@gmail.com",
        password: "bharath@248"
      };
      chai
      .request(app)
      .post('/api/v1/users/login')
      .send(login)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Login Successful");
        done();
      });
    });
  });

  describe('Forgot Password Api', () => {
    it('GivenEmailDetails_WhennotRegistered_shouldnotSendResetemail', (done) => {
      const forgot = {
        email: "bharathmighty@gmail.com"
      };
      chai
      .request(app)
      .post('/api/v1/users/forgotpassword')
      .send(forgot)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message").eql("Not Registered Yet");
        done();
      });
    });

    it('GivenEmailDetails_WhenRegistered_shouldSendResetemail', (done) => {
      const forgot = {
        email: "bharathmighty248@gmail.com"
      };
      chai
      .request(app)
      .post('/api/v1/users/forgotpassword')
      .send(forgot)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Reset-code Sent to your Email");
        done();
      });
    });
  });
});
