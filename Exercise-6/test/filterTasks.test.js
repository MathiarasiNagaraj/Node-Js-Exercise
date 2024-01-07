const { expect, should,be,equal } = require("chai");
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
              priority: "medium",
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

describe("filter task for User", () => {
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
const authToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlJhamFrdW1hciIsImlhdCI6MTcwNDYyMjQyMiwiZXhwIjoxNzA0NjI0MjIyfQ.B_eAnRImoU39C-ALRRD2KcdWWzFzORuwGGZ0FRejhNQ'
    
    it("filter Request with No Token", (done) => {
        chai
        .request(app)
            .get("/tasks/filter?filter?priority=high")
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            chai.expect(res.body).to.have.property('message',`Token Not found try login`)
           
          done();
        });
    });

    it("filtering by priority", (done) => {
        chai
        .request(app)
            .get("/tasks/filter?priority=high")  .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
     
            chai.expect(res.body).to.deep.equal({
                message: [
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
                            title: "Coding 3",
                            description: "Coding practice",
                            priority: "high",
                            dueDate: "12/5/2024",
                            comments: ["C++", "Java", "DSA"],
                            createdDate: "2024-01-07T03:52:26.970Z",
                            id: 3,
                          },
                ]
              })
  
          done();
        }); 
    }); 
})

