const { expect, should,be,equal } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);

const FILE_UTILS = require("../utils/file.utils");
const { USER_FILE_PATH } = require("../constants/common-constants");
const fileData=[
  {
    "userName": "Mathiarasi N",
    "password": "$2b$20$X1.XSWoXEILrU4jnNCCW0ONG9uQPWdVS8eOQScayrL6zVJfL5CIpy"
  },
  {
    "userName": "NISHA",
    "password": "$2b$10$0trwcWYPwNzHgvYIItFl.e1RRq78qmTByxzVUfrA.ZEKRdM9LnMdW",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5JU0hBIiwiaWF0IjoxNzAwNDUzNzM0LCJleHAiOjE3MDA1NDAxMzR9.dHU0vaj0dq3_1UQ1qqQMK-Yy28SsL1xnetC0kDDQM2s"
  },
]
describe("Unit test for User Registeration", () => {
  let sandbox;
  let readFileStub;
  let writeFileStub;

  beforeEach(() => {
    // Create a sinon sandbox for stubs and spies
    sandbox = sinon.createSandbox();

    // Stub the readFileData method from fileUtils
    readFileStub = sandbox
      .stub(FILE_UTILS, "readFileData")
      .withArgs(USER_FILE_PATH)
      .returns(Promise.resolve(fileData));
    writeFileStub = sandbox
      .stub(FILE_UTILS, "writeFileData")
      .withArgs(USER_FILE_PATH)
      .returns(Promise.resolve());
  });

  afterEach(() => {
    // Restore the sandbox to clean up stubs after each test
    sandbox.restore();
  });
  it("Registering with invalid inputs", (done) => {
    chai
      .request(app)
      .post("/users/register").send({
        "userName":"Manikandan",
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
        "userName":"Nagaraj",
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