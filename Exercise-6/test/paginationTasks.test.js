const { expect, should,be,equal } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);


describe("pagination task for User", () => {
const authToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5JU0hBIiwiaWF0IjoxNzAwNDUzNzM0LCJleHAiOjE3MDA0NTU1MzR9.oqCTPv-p_E0vFAR62cKdLwEQsMUruQYtjxofmjLOkfE'
    
    it("pagination Request with No Token", (done) => {
        chai
        .request(app)
            .get("/tasks/pagination?page=1&pageSize=3")
        .end((err, res) => {
            chai.expect(res).to.have.status(401);
            chai.expect(res.body).to.have.property('message',`Token Not found try login`)
           
          done();
        });
    });
    it("pagination Request with Invalid page", (done) => {
        chai
        .request(app)
            .get("/tasks/pagination?page=13&pageSize=3") .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(404);
            chai.expect(res.body).to.have.property('message',`Invalid pagination`)
           
          done();
        });
    });
    it("pagination Request with valid page no 1", (done) => {
        chai
        .request(app)
            .get("/tasks/pagination?page=1&pageSize=3") .set("Authorization", `Bearer ${authToken}`)
            .end((err, res) => {
           chai.expect(res.body).to.deep.equal({
            message: [
              {
                title: 'task 8',
                description: 'task description',
                priority: 'high',
                dueDate: '12/5/2023',
                comments: [
                "do it",
                "98708"
            ],
                createdDate: '2023-11-20T01:42:07.773Z',
                id: 1
              },
              {
                title: 'task 8',
                description: 'task description',
                priority: 'medium',
                dueDate: '12/5/2023',
                comments: [
                "do it",
                "98708"
            ],
                createdDate: '2023-11-20T01:42:17.990Z',
                id: 2
              },
              {
                title: 'ui',
                description: 'task description',
                priority: 'medium',
                dueDate: '12/23/2023',
                comments: [
                "do it",
                "98708"
            ],
                createdDate: '2023-11-20T01:42:23.432Z',
                id: 3
              }
            ]
          })
            chai.expect(res).to.have.status(200);
           
           
          done();
        });
    });
  

    //     chai
    //     .request(app)
    //         .get("/tasks/pagination?priority=medium")  .set("Authorization", `Bearer ${authToken}`)
    //     .end((err, res) => {
    //         chai.expect(res).to.have.status(200);
     
    //         chai.expect(res.body).to.deep.equal({
    //             message: [
    //               {
    //                 title: 'task 8',
    //                 description: 'task description',
    //                 priority: 'medium',
    //                 dueDate: '12/5/2023',
    //                 comments: [
    //             "do it",
    //             "98708"
    //         ],
    //                 createdDate: '2023-11-20T01:42:17.990Z',
    //                 id: 2
    //               },
    //               {
    //                 title: 'ui',
    //                 description: 'task description',
    //                 priority: 'medium',
    //                 dueDate: '12/23/2023',
    //                 comments: [
    //             "do it",
    //             "98708"
    //         ],
    //                 createdDate: '2023-11-20T01:42:23.432Z',
    //                 id: 3
    //               }
    //             ]
    //           })
  
    //       done();
    //     }); 
    // }); 
})

