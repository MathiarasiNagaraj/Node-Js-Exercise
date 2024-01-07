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
describe("Sort task for User", () => {
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
  
    it("Sort Request with No Token", (done) => {
        chai
        .request(app)
            .get("/tasks/sort?sortBy=priority")
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            chai.expect(res.body).to.have.property('message',`Token Not found try login`)
           
          done();
        });
    });

    it("Sorting Invalid Task value", (done) => {
        chai
        .request(app)
            .get("/tasks/sort?sortBy=nickname")  .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.have.property('message',`Invalid sort request!!!`)
          done();
        }); 
    });
    it("Sorting Task by Priority", (done) => {
        chai
        .request(app)
            .get("/tasks/sort?sortBy=title")  .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
    
            // chai.expect(res.body).to.deep.equal(

            //   {
            //     message: [
            //       {
            //         title: 'task 2',
            //         description: 'task description',
            //         priority: 'low',
            //         dueDate: '12/5/2023',
            //         comments: [
            //     "do it",
            //     "98708"
            // ],
            //         createdDate: '2023-11-20T01:42:29.486Z',
            //         id: 4
            //       },
            //       {
            //         title: 'task 4',
            //         description: 'task description',
            //         priority: 'low',
            //         dueDate: '12/5/2023',
            //         comments: [
            //     "do it",
            //     "98708"
            // ],
            //         createdDate: '2023-11-20T01:42:33.971Z',
            //         id: 5
            //       },
            //       {
            //         title: 'task 4',
            //         description: 'task description',
            //         priority: 'low',
            //         dueDate: '13/5/2023',
            //         comments: [
            //     "do it",
            //     "98708"
            // ],
            //         createdDate: '2023-11-20T01:42:38.124Z',
            //         id: 6
            //       },
            //       {
            //         title: 'task 4',
            //         description: 'task description',
            //         priority: 'low',
            //         dueDate: '13/6/2023',
            //         comments: [
            //     "do it",
            //     "98708"
            // ],
            //         createdDate: '2023-11-20T01:42:44.501Z',
            //         id: 7
            //       },
            //       {
            //         title: 'task 8',
            //         description: 'task description',
            //         priority: 'high',
            //         dueDate: '12/5/2023',
            //         comments: [
            //     "do it",
            //     "98708"
            // ],
            //         createdDate: '2023-11-20T01:42:07.773Z',
            //         id: 1
            //       },
            //       {
            //         title: 'task 8',
            //         description: 'task description',
            //         priority: 'medium',
            //         dueDate: '12/5/2023',
            //         comments: [
            //     "do it",
            //     "98708"
            // ],
            //         createdDate: '2023-11-20T01:42:17.990Z',
            //         id: 2
            //       },
            //       {
            //         title: 'ui',
            //         description: 'task description',
            //         priority: 'medium',
            //         dueDate: '12/23/2023',
            //         comments: [
            //             "do it",
            //             "98708"
            //         ],
            //         createdDate: '2023-11-20T01:42:23.432Z',
            //         id: 3
            //       }
            //     ]
            //   })
          done();
        });
    });

    it("Sorting Task by priority", (done) => {
        chai
        .request(app)
            .get("/tasks/sort?sortBy=priority")  .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);

            // chai.expect(res.body).to.deep.equal(

            //     {  message: [
            //         {
            //           title: 'task 8',
            //           description: 'task description',
            //           priority: 'high',
            //           dueDate: '12/5/2023',
            //           comments: [
            //             "do it",
            //             "98708"
            //         ],
            //           createdDate: '2023-11-20T01:42:07.773Z',
            //           id: 1
            //         },
            //         {
            //           title: 'task 8',
            //           description: 'task description',
            //           priority: 'medium',
            //           dueDate: '12/5/2023',
            //           comments: [
            //             "do it",
            //             "98708"
            //         ],
            //           createdDate: '2023-11-20T01:42:17.990Z',
            //           id: 2
            //         },
            //         {
            //           title: 'ui',
            //           description: 'task description',
            //           priority: 'medium',
            //           dueDate: '12/23/2023',
            //           comments: [
            //             "do it",
            //             "98708"
            //         ],
            //           createdDate: '2023-11-20T01:42:23.432Z',
            //           id: 3
            //         },
            //         {
            //           title: 'task 2',
            //           description: 'task description',
            //           priority: 'low',
            //           dueDate: '12/5/2023',
            //           comments: [
            //             "do it",
            //             "98708"
            //         ],
            //           createdDate: '2023-11-20T01:42:29.486Z',
            //           id: 4
            //         },
            //         {
            //           title: 'task 4',
            //           description: 'task description',
            //           priority: 'low',
            //           dueDate: '12/5/2023',
            //           comments: [
            //             "do it",
            //             "98708"
            //         ],
            //           createdDate: '2023-11-20T01:42:33.971Z',
            //           id: 5
            //         },
            //         {
            //           title: 'task 4',
            //           description: 'task description',
            //           priority: 'low',
            //           dueDate: '13/5/2023',
            //           comments: [
            //             "do it",
            //             "98708"
            //         ],
            //           createdDate: '2023-11-20T01:42:38.124Z',
            //           id: 6
            //         },
            //         {
            //           title: 'task 4',
            //           description: 'task description',
            //           priority: 'low',
            //           dueDate: '13/6/2023',
            //           comments: [
            //             "do it",
            //             "98708"
            //         ],
            //           createdDate: '2023-11-20T01:42:44.501Z',
            //           id: 7
            //         }
            //       ]
            //     }
                    
            //      )
          done();
        });
    });
    it("Sorting Task by DueDate", (done) => {
        chai
        .request(app)
            .get("/tasks/sort?sortBy=dueDate")  .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);

            // chai.expect(res.body).to.deep.equal(

            //     {
            //         message: [
            //           {
            //             title: 'task 8',
            //             description: 'task description',
            //             priority: 'high',
            //             dueDate: '12/5/2023',
            //             comments:[
            //             "do it",
            //             "98708"
            //         ],
            //             createdDate: '2023-11-20T01:42:07.773Z',
            //             id: 1
            //           },
            //           {
            //             title: 'task 8',
            //             description: 'task description',
            //             priority: 'medium',
            //             dueDate: '12/5/2023',
            //             comments:[
            //             "do it",
            //             "98708"
            //         ],
            //             createdDate: '2023-11-20T01:42:17.990Z',
            //             id: 2
            //           },
            //           {
            //             title: 'task 2',
            //             description: 'task description',
            //             priority: 'low',
            //             dueDate: '12/5/2023',
            //             comments:[
            //             "do it",
            //             "98708"
            //         ],
            //             createdDate: '2023-11-20T01:42:29.486Z',
            //             id: 4
            //           },
            //           {
            //             title: 'task 4',
            //             description: 'task description',
            //             priority: 'low',
            //             dueDate: '12/5/2023',
            //             comments:[
            //             "do it",
            //             "98708"
            //         ],
            //             createdDate: '2023-11-20T01:42:33.971Z',
            //             id: 5
            //           },
            //           {
            //             title: 'ui',
            //             description: 'task description',
            //             priority: 'medium',
            //             dueDate: '12/23/2023',
            //             comments:[
            //             "do it",
            //             "98708"
            //         ],
            //             createdDate: '2023-11-20T01:42:23.432Z',
            //             id: 3
            //           },
            //           {
            //             title: 'task 4',
            //             description: 'task description',
            //             priority: 'low',
            //             dueDate: '13/5/2023',
            //             comments:[
            //             "do it",
            //             "98708"
            //         ],
            //             createdDate: '2023-11-20T01:42:38.124Z',
            //             id: 6
            //           },
            //           {
            //             title: 'task 4',
            //             description: 'task description',
            //             priority: 'low',
            //             dueDate: '13/6/2023',
            //             comments:[
            //             "do it",
            //             "98708"
            //         ],
            //             createdDate: '2023-11-20T01:42:44.501Z',
            //             id: 7
            //           }
            //         ]
            //       } 
            //      )
          done();
        });
    });
})