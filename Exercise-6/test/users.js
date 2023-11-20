const { expect, should,be,equal } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);
describe("Unit test for User Registeration", () => {
  it("Registering with invalid inputs", (done) => {
    chai
      .request(app)
      .post("/users/register").send({
        "userName":"Mani",
        "password":"123"
    })
      .end((err, res) => {
        chai.expect(res).to.have.status(400);

        done();
      });
  });
 
  it("Registering with existing user details", (done) => {
    chai
      .request(app)
      .post("/users/register").send({
        "userName":"NISHA",
        "password":"Nisha@2002"
    })
      .end((err, res) => {
        chai.expect(res).to.have.status(409);

        done();
      });
  });

  it("Registering with valid User details", (done) => {
    chai
      .request(app)
      .post("/users/register").send({
        "userName":"NijinVindan",
        "password":"Nijin@123"
    })
      .end((err, res) => {
        chai.expect(res).to.have.status(201);

        done();
      });
  });

});

describe("Unit test for User Login", () => {
  it('logging with invalid user data', (done) => {
    
    chai
      .request(app)
      .post("/users/login").send({
        "userName": "NijinV",
        "password": "Nijin@123"
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(404);
        chai.expect(res.body).to.have.property('message',`NijinV NOT FOUND`)
        done();
      });
  });
  it('logging with Valid user data', (done) => {
    
    chai
      .request(app)
      .post("/users/login").send({
        "userName": "NijinVindan",
        "password": "Nijin@123"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('accessToken');
        expect(res.body.accessToken).to.be.a('string');
        expect(res.body).to.have.property('message', 'NijinVindan LOGGED IN  SUCCESSFULLY');

        done();
      });
  });
});