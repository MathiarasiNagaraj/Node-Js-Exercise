const { expect, should,be,equal } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);

const ValidTask = {
    "title": "Coding",
       "description":"Coding practice",
       "priority": "high",
       "dueDate": "12/5/2023",
       "comments":["C++","Java","DSA"]
}
const InvalidTask = {

    "description":"Coding practice",
    "priority": "high",
    "dueDate": "12/5/2023",
    "comments":["C++","Java","DSA"]
   }
describe("Add task for User", () => {
const authToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5JU0hBIiwiaWF0IjoxNzAwNDA0ODI4LCJleHAiOjE3MDA0MDY2Mjh9.gWREEsbGQnZNgpZRfkuKTLBE7w2vpbas6Rcv3MimIyI'
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
            chai.expect(res.body).to.have.property('message',`ADDED SUCCESSFULLY`)
          done();
        });
    });
})