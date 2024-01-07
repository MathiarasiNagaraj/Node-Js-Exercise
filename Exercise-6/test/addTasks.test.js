
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);
const FILE_UTILS = require("../utils/file.utils");
const { TASK_FILE_PATH } = require("../constants/common-constants");
const ValidTask = {
    "title": "Coding",
       "description":"Coding practice",
       "priority": "high",
       "dueDate": "12/5/2024",
       "comments":["C++","Java","DSA"]
}
const InvalidTask = {

    "description":"Coding practice",
    "priority": "high",
    "dueDate": "12/5/2024",
    "comments":["C++","Java","DSA"]
}
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
describe("Add task for User", () => {
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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlJhamFrdW1hciIsImlhdCI6MTcwNDYyMjQyMiwiZXhwIjoxNzA0NjI0MjIyfQ.B_eAnRImoU39C-ALRRD2KcdWWzFzORuwGGZ0FRejhNQ";
  
    it("Add Request with No body", (done) => {
        chai
        .request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.have.property('message',`REQUIRED TASK DETAILS`)
          done();
        });
    });
    it("Add Request with No Token", (done) => {
        chai
        .request(app)
            .post("/tasks")
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            chai.expect(res.body).to.have.property('message',`Token Not found try login`)
           
          done();
        });
    });

    it("Adding Invalid Task", (done) => {
        chai
        .request(app)
            .post("/tasks")  .set("Authorization", `Bearer ${authToken}`).send(InvalidTask)
        .end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.have.property('message',`TITLE SHOULD CONTAIN ATLEAST 1 LETTER`)
          done();
        });
    });
    it("Adding valid Task", (done) => {

        chai
        .request(app)
            .post("/tasks")  .set("Authorization", `Bearer ${authToken}`).send(ValidTask)
        .end((err, res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.have.property('message', `ADDED SUCCESSFULLY`)
            
            done();
      
        });
    });
})