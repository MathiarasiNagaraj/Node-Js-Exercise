const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);
const FILE_UTILS = require("../utils/file.utils");
const { TASK_FILE_PATH } = require("../constants/common-constants");
const fileData = [
  {
    userName: "Rajakumar",
    tasks: [
      {
        title: "Coding 1",
        description: "Coding practice",
        priority: "high",
        dueDate: "12/5/2024",
        comments: ["C++", "Java", "DSA"],
        createdDate: "2024-01-07T03:52:26.970Z",
        id: 1,
        },
        {
            title: "Coding 2",
            description: "Coding practice",
            priority: "high",
            dueDate: "12/5/2024",
            comments: ["C++", "Java", "DSA"],
            createdDate: "2024-01-07T03:52:26.970Z",
            id: 2,
        },
        {
            title: "Coding 3",
            description: "Coding practice",
            priority: "high",
            dueDate: "12/5/2024",
            comments: ["C++", "Java", "DSA"],
            createdDate: "2024-01-07T03:52:26.970Z",
            id: 3,
          },
    ],
  },
];
describe("Delete task for User", () => {
  let sandbox;
  let readFileStub;
  let writeFileStub;

  beforeEach(() => {
    // Create a sinon sandbox for stubs and spies
    sandbox = sinon.createSandbox();

    // Stub the readFileData method from fileUtils
    readFileStub = sandbox
      .stub(FILE_UTILS, "readFileData")
      .withArgs(TASK_FILE_PATH)
      .returns(Promise.resolve(fileData));
    writeFileStub = sandbox
      .stub(FILE_UTILS, "writeFileData")
      .withArgs(TASK_FILE_PATH)
      .returns(Promise.resolve());
  });

  afterEach(() => {
    // Restore the sandbox to clean up stubs after each test
    sandbox.restore();
  });
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlJhamFrdW1hciIsImlhdCI6MTcwNDYxOTM2OCwiZXhwIjoxNzA0NjIxMTY4fQ.X-sJoe0O4JWUAOeoduNFSirbDPXShuFC4pRcpiRtApY";

  it("Delete Request with No Token", (done) => {
    chai
      .request(app)
      .delete("/tasks")
      .end((err, res) => {
        chai.expect(res).to.have.status(401);
        chai
          .expect(res.body)
          .to.have.property("message", `Token Not found try login`);

        done();
      });
  });
  it("Delete Request with Invalid Task Id", (done) => {
    chai
      .request(app)
      .delete("/tasks/45")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        chai.expect(res).to.have.status(404);
        chai.expect(res.body).to.have.property("message", `INVALID TASK ID`);

        done();
      });
  });
  it("Deleteing valid Task id ", (done) => {
    chai
      .request(app)
      .delete("/tasks/1")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai
          .expect(res.body)
          .to.have.property("message", "DELETED SUCCESSFULLY");

        done();
      });
  });
  it("Deleteing All tasks", (done) => {
    chai
      .request(app)
      .delete("/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);

        done();
      });
  });
});
