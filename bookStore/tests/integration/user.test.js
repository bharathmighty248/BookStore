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
});
